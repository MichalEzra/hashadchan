// HomePage.tsx
import { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Search, MessageCircle, Shield, Users } from 'lucide-react';
import styles from '../components/design/HomePage.module.css';

export default function HomePage() {
    const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: ''
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
    console.log('התחברות:', loginData);
    setShowLoginModal(false);
  };

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('הסיסמאות לא תואמות');
      return;
    }
    console.log('הרשמה:', registerData);
    setShowRegisterModal(false);
  };

  return (
    <div className={styles.container}>
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

        {/* כפתורי פעולה */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={() => navigate('/login')}
            className={styles.buttonPrimary}
          >
            יש לנו כבר חשבון
            <br />
            <span className="text-lg">התחברו</span>
          </button>

          <button
            onClick={() => navigate('/logup')}
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

        {/* סקשן תכונות */}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                התחבר
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

            {/* פה נשאיר את טופס ההרשמה שלך כמו שהיה */}
            {/* (כדי לא להאריך פה — אפשר להשאיר אותו כמו במקור) */}
          </div>
        </div>
      )}
    </div>
  );
}
