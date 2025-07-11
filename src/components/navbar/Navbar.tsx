import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/Paths';
import styles from './Navbar.module.css';
import styles2 from '../../pages/style/HomePage.module.css'
import { useAppSelector } from '../../redux/store';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { loadUserFromToken, loginUser, registerUser } from "../../redux/thunks/auth.thunk"; // פעולה שמנקה את הסטייט של המשתמש
import {  jwtDecode, mapJwtClaims } from '../../auth/auth.utils';
import { UserType } from '../../types/enums';
import { logoutUser } from '../../redux/auth/auth.slice';

const LogoutButton = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // הסרת הטוקן
    dispatch(logoutUser()); // אופציונלי – נקה את הסטייט של המשתמש
    navigate("/"); // או לכל עמוד שתרצי
  };

  return <button onClick={handleLogout}>התנתק</button>;
};

// export default LogoutButton;


const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // const { user } = useAppSelector((state) => state.auth);

  const { user, isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  const userType = user?.userType;
  const userName = user?.fullName;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUserFromToken());
      const payload = jwtDecode(token);
      console.log("Payload מהטוקן:", payload);
      console.log('Token found, loading user from token', token);
    }
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("🎯 Redux user:", user);
  //   console.log("🎯 userType:", userType);
  // }, [user, userType]);

  useEffect(() => {
    if (isAuthenticated && userType ) {
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
      const row = loadUserFromToken();
      if (!row) {
        console.error('❌ טוקן לא קיים או לא תקף');
        return;
      }
      const user = mapJwtClaims(row);
      const userType = user?.id;
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

  // console.log("user מהרדאקס:", user);
  //למה אני לא רואה שהמשתמש מחובר?
  //  const token = localStorage.getItem("user");
  // console.log("הטוקן:", token);
  // console.log("סוג המשתמש:", user?.userType);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>השדכן</div>

      <button
        className={styles.menuButton}
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        {/* איקון המבורגר */}
        <div className={`${styles.bar} ${menuOpen ? styles.bar1Active : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.bar2Active : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.bar3Active : ''}`}></div>
      </button>

      <div
        className={`${styles.links} ${menuOpen ? styles.linksMobileOpen : ''}`}
        onClick={() => setMenuOpen(false)} // סגירת התפריט בלחיצה על קישור במובייל
      >
        <Link to={PATHS.home}>דף הבית</Link>
        <Link to={PATHS.daatTorah}>דעת תורה</Link>
        <Link to={PATHS.engaged}>מאורסים</Link>
        <Link to={PATHS.hereToServeYou}>כאן לשירותכם</Link>
        <Link to={PATHS.userGuide}>מדריך למשתמש</Link>
        {user?.userType === UserType.MATCHMAKER && ( // ודא ש-"MATCHMAKER" הוא השם הנכון של התפקיד
          <Link to={PATHS.createMatch}>הצעות שידוכים</Link>
        )}
      </div>

      <div className={styles.login}>
        {user?.userType ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span role="img" aria-label="User">👤 מחובר</span>
            <LogoutButton className={styles.logoutButton} />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick= {()=> setShowLoginModal(true)}>התחברות 👤</button>
            <button onClick= {()=> setShowRegisterModal(true)}>הרשמה 👤</button>

          </div>
        )}
        {showLoginModal && (
        <div className={styles2.modalBackdrop}>
          <div className={styles2.modal}>
            <button onClick={() => {setShowLoginModal(false); setLoginData({ email: '', password: '' }); }} className={styles2.modalClose}>×</button>
            <h2>התחברות</h2>
            <form onSubmit={handleLogin}>
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="הכנס אימייל" />
              {loginErrors.email && <p className={styles2.errorMessage}>{loginErrors.email}</p>}
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="הכנס סיסמה" />
              {loginErrors.password && <p className={styles2.errorMessage}>{loginErrors.password}</p>}
              <button type="submit">{isLoading ? 'מתחבר...' : 'התחבר'}</button>
            </form>
            <p>אין לך חשבון? <button onClick={() => {setShowLoginModal(false); setShowRegisterModal(true); }}>הירשם כאן</button></p>
          </div>
        </div>
      )}

      
      {showRegisterModal && (
        <div className={styles2.modalBackdrop}>
          <div className={styles2.modal}>
            <button onClick={() => { setShowRegisterModal(false); setRegisterData({ fullName: '', email: '', password: '', phoneNumber: '', userType: UserType.PARENT }); }} className={styles2.modalClose}>×</button>
            <h2>הרשמה</h2>
            <form onSubmit={handleRegister}>
              <input type="text" name="fullName" value={registerData.fullName} onChange={handleRegisterChange} placeholder="שם מלא" />
              {registerErrors.fullName && <p className={styles2.errorMessage}>{registerErrors.fullName}</p>}
              <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="your.email@example.com" />
              {registerErrors.email && <p className={styles2.errorMessage}>{registerErrors.email}</p>}
              <input type="tel" name="phoneNumber" value={registerData.phoneNumber} onChange={handleRegisterChange} placeholder="050-1234567" />
              <select name="userType" value={registerData.userType} onChange={handleRegisterChange}>
                <option value="">בחר סוג משתמש</option>
                <option value="PARENT">הורה</option>
                <option value="CANDIDATE">מועמד</option>
                <option value="MATCHMAKER">שדכן</option>
              </select>
              {registerErrors.userType && <p className={styles.errorMessage}>{registerErrors.userType}</p>}
              <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="סיסמה (לפחות 6 תווים)" />
              {registerErrors.password && <p className={styles2.errorMessage}>{registerErrors.password}</p>}
              <button type="submit">{isLoading ? 'נרשם...' : 'הירשם'}</button>
            </form>
            <p>כבר יש לך חשבון? <button onClick={() => {setShowRegisterModal(false); setShowLoginModal(true); }}>התחבר כאן</button></p>
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;

