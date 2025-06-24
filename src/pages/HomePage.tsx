// HomePage.tsx
import { useState, ChangeEvent, MouseEvent, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, MessageCircle, Shield, Users, Settings, UserCheck, UserX, Edit3 } from 'lucide-react';
import styles from './style/HomePage.module.css';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadUserFromToken, loginUser, registerUser } from '../redux/auth/auth.slice';
import { login, Signup } from '../services/auth.service';
import { UserType } from '../types/enums';
import { getUserFromToken, mapJwtClaims, parseJWT } from '../auth/auth.utils';
import { ENDPOINTS } from '../api/endpoints';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  const userType = user?.userType;
  const userName = user?.fullName;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUserFromToken(token));
      const payload = parseJWT(token);
      console.log("Payload מהטוקן:", payload);
      console.log('Token found, loading user from token', token);
    }
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("🎯 Redux user:", user);
  //   console.log("🎯 userType:", userType);
  // }, [user, userType]);

  useEffect(() => {
    if (isAuthenticated && userType && userType !== "GUEST") {
      navigate('/');
    }
  }, [isAuthenticated, userType, navigate]);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullName: '', email: '', password: '', phoneNumber: '', userType: UserType.PARENT
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
    setRegisterData(prev => ({ ...prev, [name]: value }));
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
    if (!registerData.userType) newErrors.userType = 'סוג משתמש נדרש';
    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLogin()) return;
    try {
      console.log('loginData', loginData);
      await dispatch(loginUser(loginData)).unwrap();

      setShowLoginModal(false);
      setLoginData({ email: '', password: '' });
      setLoginErrors({});
      console.log('התחברות בוצעה בהצלחה');
      const row = getUserFromToken();
      if (!row) {
        console.error('❌ טוקן לא קיים או לא תקף');
        return;
      }
      const user = mapJwtClaims(row);
      const userType = user.role;
      console.log('userType', userType);
    } catch (error) {
      console.error('שגיאה בהתחברות:', error);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateRegister()) return;
    try {
      console.log('registerData', registerData);
      await dispatch(registerUser(registerData)).unwrap();
      setShowRegisterModal(false);
      setRegisterData({ fullName: '', email: '', password: '', phoneNumber: '', userType: (e.target as HTMLSelectElement).value as UserType });
      setRegisterErrors({});
    } catch (error) {
      console.error('שגיאה בהרשמה:', error);
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

      {(!isAuthenticated || userType === "GUEST") && (
        <div className={styles.buttonGroup}>
          <button onClick={() => setShowLoginModal(true)} className={styles.buttonPrimary}>יש לנו כבר חשבון<br />התחברו</button>
          <button onClick={() => { setShowRegisterModal(true) }} className={styles.buttonSecondary}>רוצים להירשם?<br />בואו נתחיל</button>
          <button className={styles.buttonTertiary}>מעוניינים לקבל קצת יותר<br />כנסו להירשם</button>
        </div>
      )}

      {user && userType === "ADMIN" && (
        <div>
          <h2>שלום {userName}, אתה מחובר כמנהל מערכת</h2>
          <button onClick={() => navigate('/users')}>ניהול משתמשים</button>
          <button onClick={() => navigate('/candidates')}>ניהול מועמדים</button>
          <button onClick={() => navigate('/matchmakers')}>ניהול שדכנים</button>
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
            <p>אין לך חשבון? <button onClick={() => { setShowRegisterModal(true); }}>הירשם כאן</button></p>
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
                <option value="CANDIDATE">מועמד</option>
                <option value="MATCHMAKER">שדכן</option>
              </select>
              {registerErrors.userType && <p className={styles.errorMessage}>{registerErrors.userType}</p>}
              <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="סיסמה (לפחות 6 תווים)" />
              {registerErrors.password && <p className={styles.errorMessage}>{registerErrors.password}</p>}
              <button type="submit">{isLoading ? 'נרשם...' : 'הירשם'}</button>
            </form>
            <p>כבר יש לך חשבון? <button onClick={() => { setShowLoginModal(true); }}>התחבר כאן</button></p>
          </div>
        </div>
      )}
    </div>
  );
}
