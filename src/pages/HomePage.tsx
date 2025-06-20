// HomePage.tsx
import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Search, MessageCircle, Shield, Users, Settings, UserCheck, UserX, Edit3 } from 'lucide-react';
import styles from './style/HomePage.module.css';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadUserFromToken, loginUser, registerUser } from '../redux/auth/auth.slice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const { user, isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  const userType = user?.userType;
  const userName = user?.fullName;

  // Local state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // טעינת המשתמש מהטוקן בטעינת הדף
  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  // הפניה לדשבורד אם המשתמש מחובר
  useEffect(() => {
    if (isAuthenticated && userType && userType !== "GUEST") {
      navigate('/dashboard');
    }
  }, [isAuthenticated, userType, navigate]);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    userType: ''
  });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginData)).unwrap();
      setShowLoginModal(false);
      // ההפניה תקרה אוטומטית ב-useEffect
    } catch (error) {
      console.error('שגיאה בהתחברות:', error);
      // כאן תוכל להציג הודעת שגיאה למשתמש
    }
  };

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(registerData)).unwrap();
      setShowRegisterModal(false);
      // ההפניה תקרה אוטומטically ב-useEffect אם ההרשמה מצליחה
    } catch (error) {
      console.error('שגיאה בהרשמה:', error);
      // כאן תוכל להציג הודעת שגיאה למשתמש
    }
  };

  // מציג loading עד שמסתיימת בדיקת הטוקן
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">טוען...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* הצגת שגיאות */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50">
          {error}
        </div>
      )}

      {/* תוכן ראשי */}
      <div className="container mx-auto px-4 py-16">
        <div className={styles.title}>
          <div className="mb-6">
            <span className="text-yellow-400 text-lg font-medium">מחפשים שידוך?</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-blue-300">יהשדכן</span>
            <span className="text-white"> כאן</span>
            <br />
            <span className="text-white">כדי לעזור </span>
            <span className="text-blue-300">לכם למצוא!</span>
          </h1>

          <div className="space-y-4 text-xl md:text-2xl font-light max-w-4xl mx-auto">
            <p className="text-blue-200">
              מיזם השידוכים הגדול של הציבור החרדי
            </p>
            <p className="text-gray-300">
              בנושיאות מרן ורבני גדולי ישראל שליט"א ובהנהגת ר' יוחנן איינשטיין שליט"א ועמרם פריד שליט"א
            </p>
            <p className="text-gray-400">
              היחיד שמאפשר לכם למצוא את ההצעה המתאימה ביותר לילדכם באופן עצמאי, מכובד ודיסקרטי.
            </p>
          </div>
        </div>

        {/* כפתורי פעולה רגילים (רק למשתמשים לא מחוברים או אורחים) */}
        {(!isAuthenticated || userType === "GUEST") && (
          // "flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
          <div className= {styles.buttonGroup}>
            <button
              onClick={() => setShowLoginModal(true)}
              className={styles.buttonPrimary}
            >
              יש לנו כבר חשבון
              <br />
              <span className="text-lg">התחברו</span>
            </button>

            <button
              onClick={() => setShowRegisterModal(true)}
              className={styles.buttonSecondary}
            >
              רצים להירשם?
              <br />
              <span className="text-lg">בואו נתחיל</span>
            </button>

            <button className={styles.buttonTertiary}>
              מעוניינים לקבל קצת יותר
              <br />
              <span className="text-lg">כנסו להירשם</span>
            </button>
          </div>
        )}

        {/* פאנל ניהול למנהל */}
        {userType === "ADMIN" && (
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-3xl p-8 mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Settings className="w-8 h-8 text-purple-300" />
                <h2 className="text-3xl font-bold text-white">ברוכים הבאים למערכת הניהול</h2>
              </div>
              <p className="text-purple-200 text-lg">שלום {userName}, אתה מחובר כמנהל מערכת</p>
            </div>

            {/* כפתורי ניהול ראשיים */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                   onClick={() => navigate('/admin/users')}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">ניהול משתמשים</h3>
                </div>
                <p className="text-gray-300">צפייה, עריכה ומחיקה של כל המשתמשים במערכת</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">חיפוש</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">עריכה</span>
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">מחיקה</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                   onClick={() => navigate('/admin/candidates')}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-pink-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">ניהול מועמדים</h3>
                </div>
                <p className="text-gray-300">ניהול פרופילי המועמדים, אישור והתאמות</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">אישור</span>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">התאמות</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                   onClick={() => navigate('/admin/matchmakers')}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">ניהול שדכנים</h3>
                </div>
                <p className="text-gray-300">ניהול שדכנים במערכת, הרשאות ופעילות</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">הרשאות</span>
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">פעילות</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* סקשן תכונות */}
        {(!isAuthenticated || userType !== "ADMIN") && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold">בטוח ומאובטח</h3>
                <p className="text-gray-300">כל הפרטים שלכם מוגנים ברמה הגבוהה ביותר</p>
              </div>

              <div className="space-y-4">
                <div className="bg-pink-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-pink-300" />
                </div>
                <h3 className="text-xl font-semibold">התאמה מושלמת</h3>
                <p className="text-gray-300">מערכת חכמה למציאת ההתאמה הטובה ביותר</p>
              </div>

              <div className="space-y-4">
                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-green-300" />
                </div>
                <h3 className="text-xl font-semibold">קהילה גדולה</h3>
                <p className="text-gray-300">אלפי משפחות כבר מצאו את השידוך המושלם</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* מודל התחברות */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">התחברות</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">אימייל</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הכנס אימייל"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">סיסמה</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הכנס סיסמה"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {isLoading ? 'מתחבר...' : 'התחבר'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* מודל הרשמה */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">הרשמה</h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">שם מלא</label>
                <input
                  type="text"
                  name="fullName"
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הכנס שם מלא"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">אימייל</label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הכנס אימייל"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">מספר טלפון</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={registerData.phoneNumber}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הכנס מספר טלפון"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">סוג משתמש</label>
                <select
                  name="userType"
                  value={registerData.userType}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">בחר סוג משתמש</option>
                  <option value="PARENT">הורה</option>
                  <option value="CANDIDATE">מועמד</option>
                  <option value="MATCHMAKER">שדכן</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">סיסמה</label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הכנס סיסמה"
                />
              </div>

              <button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {isLoading ? 'נרשם...' : 'הירשם'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  )
}