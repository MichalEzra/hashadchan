// HomePage.tsx
import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style/HomePage.module.css';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadUserFromToken, loginUser, registerUser, setUser } from '../redux/auth/auth.slice';
import { UserType } from '../types/enums';
import { mapJwtClaims } from '../auth/auth.utils';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  const userType = user?.userType;
  const userName = user?.fullName;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false); // New loading state for register form

  useEffect(() => {
    if (user) {
      console.log("✅ התחברות בוצעה בהצלחה!", user);
      console.log("🔍 userType =", user?.userType);

      navigate("/"); // או כל מסלול מתאים
    }
  }, [user]);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullName: '', email: '', password: '', phoneNumber: '', userType: UserType.DEFAULT
  });

  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [registerErrors, setRegisterErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    userType?: string;
  }>({});

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (loginErrors[name as keyof typeof loginErrors]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: name === "userType" ? value as UserType : value
    }));

    if (registerErrors[name as keyof typeof registerErrors]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateLogin = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!loginData.email.trim()) {
      newErrors.email = 'אימייל נדרש';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'אימייל לא תקין';
    }
    if (!loginData.password) {
      newErrors.password = 'סיסמה נדרשת';
    }
    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (): boolean => {
    const newErrors: { fullName?: string; email?: string; password?: string; userType?: string } = {};
    if (!registerData.fullName.trim()) newErrors.fullName = 'שם מלא נדרש';
    if (!registerData.email.trim()) {
      newErrors.email = 'אימייל נדרש';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'אימייל לא תקין';
    }
    if (!registerData.password) {
      newErrors.password = 'סיסמה נדרשת';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
    }
    if (!registerData.userType || userType === UserType.DEFAULT) newErrors.userType = 'סוג משתמש נדרש';
    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLogin()) {
      return;
    }

    try {
      // קורא ל-thunk של ההתחברות (loginUser).
      // ה-thunk הזה כבר מטפל בשליחת הבקשה לשרת דרך auth.service.ts,
      // שמירת הטוקן ב-localStorage, פענוח המשתמש ועדכון Redux state.
      await dispatch(loginUser(loginData)).unwrap();

      // אם ההתחברות הצליחה, סגור את המודאל ונקה את הטופס.
      setShowLoginModal(false);
      setLoginData({ email: '', password: '' });
      setLoginErrors({});
      // הניווט יטופל אוטומטית על ידי ה-useEffect לעיל כשה-Redux state מתעדכן.
    } catch (loginError: any) {
      // הודעת השגיאה מגיעה מה-rejectWithValue של ה-thunk,
      // והיא כבר נשמרת במצב ה-error של Redux (state.auth.error).
      console.error('שגיאה בהתחברות:', loginError);
      // אתה יכול להציג אותה למשתמש באמצעות ה-error state של Redux.
    }
  };
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateRegister()) {
      return;
    }

    setIsRegisterLoading(true);
    try {
      // קורא ל-thunk של ההרשמה (registerUser).
      // ה-thunk הזה כבר מטפל בשליחת הבקשה לשרת דרך auth.service.ts,
      // שמירת הטוקן ב-localStorage (אם הוחזר), פענוח המשתמש ועדכון Redux state.
      await dispatch(registerUser(registerData)).unwrap();

      // אם ההרשמה הצליחה, סגור את המודאל ונקה את הטופס.
      setShowRegisterModal(false);
      setRegisterData({ // Reset form after successful registration
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        userType: UserType.PARENT
      });
      setRegisterErrors({}); // Clear errors
      // הניווט יטופל אוטומטית על ידי ה-useEffect לעיל כשה-Redux state מתעדכן.
    } catch (registerError: any) {
      console.error('שגיאה בהרשמה:', registerError);
      // מצב השגיאה ב-Redux יתעדכן אוטומטית על ידי ה-extraReducers של ה-slice.  
    } finally {
      setIsRegisterLoading(false);
    }
  };


  if (isLoading) {
    return <div className={styles.container}><div>טוען...</div></div>;
  }

  return (
    <div className={styles.container}>
      {error && <div>{error}</div>}

      <div className={styles.title}>
        <div>מחפשים שידוך?</div>
        <h1>יהשדכן כאן כדי לעזור לכם למצוא!</h1>
        <p>מיזם השידוכים הגדול של הציבור החרדי</p>
        <p>בנושיאות מרן ורבני גדולי ישראל שליט"א</p>
        <p>היחיד שמאפשר למצוא הצעה מתאימה בדיסקרטיות</p>
      </div>

      {(!isAuthenticated || !userType) && (
        <div className={styles.buttonGroup}>
          <button onClick={() => setShowLoginModal(true)} className={styles.buttonPrimary}>יש לנו כבר חשבון<br />התחברו</button>
          <button onClick={() => { setShowRegisterModal(true) }} className={styles.buttonSecondary}>רוצים להירשם?<br />בואו נתחיל</button>
          <button className={styles.buttonTertiary}>מעוניינים לקבל קצת יותר<br />כנסו להירשם</button>
        </div>
      )}

      {user && userType === UserType.ADMIN && (
        <div className={styles.adminButtonsContainer}>
          <h2>שלום {userName}, אתה מחובר כמנהל מערכת</h2>
          <button className={styles.adminButton} onClick={() => navigate('/users')}>ניהול משתמשים</button>
          <button className={styles.adminButton} onClick={() => navigate('/candidates')}>ניהול מועמדים</button>
          <button className={styles.adminButton} onClick={() => navigate('/matchmakers')}>ניהול שדכנים</button>
        </div>
      )}

      {user && userType === UserType.MATCHMAKER && (
        <div className={styles.adminButtonsContainer}>
          <h2>שלום {userName}, אתה מחובר כשדכן</h2>
          {/* <button className={styles.adminButton} onClick={() => navigate('/users')}>ניהול משתמשים</button> */}
          <button className={styles.adminButton} onClick={() => navigate('/candidates')}>ניהול מועמדים</button>
          <button className={styles.adminButton} onClick={() => navigate('/match')}>התאמת מועמדים</button>
        </div>
      )}
      
      {user && userType === UserType.PARENT && (
        <div className={styles.adminButtonsContainer}>
          <h2>שלום {userName}, אתה מחובר כהורה</h2>
          {/* <button className={styles.adminButton} onClick={() => navigate('/users')}>ניהול משתמשים</button> */}
          <button className={styles.adminButton} onClick={() => navigate('/candidates/new')}>הוספת מועמד</button>
          <button className={styles.adminButton} onClick={() => navigate('/algorithm-match')}>חיפוש הצעות מתאימות</button>
        </div>
      )}

      {showLoginModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button onClick={() => { setShowLoginModal(false); setLoginData({ email: '', password: '' }); }} className={styles.modalClose}>×</button>
            <h2>התחברות</h2>
            <form onSubmit={handleLogin}>
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="הכנס אימייל" />
              {loginErrors.email && <p className={styles.errorMessage}>{loginErrors.email}</p>}
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="הכנס סיסמה" />
              {loginErrors.password && <p className={styles.errorMessage}>{loginErrors.password}</p>}
              <button type="submit">{isLoading ? 'מתחבר...' : 'התחבר'}</button>
            </form>
            <p>אין לך חשבון? <button onClick={() => { setShowRegisterModal(true); setShowLoginModal(false) }}>הירשם כאן</button></p>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button onClick={() => { setShowRegisterModal(false); setRegisterData({ fullName: '', email: '', password: '', phoneNumber: '', userType: UserType.PARENT }); }} className={styles.modalClose}>×</button>
            <h2>הרשמה</h2>
            <form onSubmit={handleRegister}>
              <input type="text" name="fullName" value={registerData.fullName} onChange={handleRegisterChange} placeholder="שם מלא" />
              {registerErrors.fullName && <p className={styles.errorMessage}>{registerErrors.fullName}</p>}
              <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="your.email@example.com" />
              {registerErrors.email && <p className={styles.errorMessage}>{registerErrors.email}</p>}
              <input type="tel" name="phoneNumber" value={registerData.phoneNumber} onChange={handleRegisterChange} placeholder="050-1234567" />
              <select name="userType" value={registerData.userType} onChange={handleRegisterChange}>
                <option value="">בחר סוג משתמש</option>
                <option value="PARENT">הורה</option>
                {/* <option value="CANDIDATE">מועמד</option> */}
                <option value="MATCHMAKER">שדכן</option>
              </select>
              {registerErrors.userType && <p className={styles.errorMessage}>{registerErrors.userType}</p>}
              <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="סיסמה (לפחות 6 תווים)" />
              {registerErrors.password && <p className={styles.errorMessage}>{registerErrors.password}</p>}
              <button type="submit">{isLoading ? 'נרשם...' : 'הירשם'}</button>
            </form>
            <p>כבר יש לך חשבון? <button onClick={() => { setShowLoginModal(true);setShowRegisterModal(false) }}>התחבר כאן</button></p>
          </div>
        </div>
      )}
    </div>
  );
}
