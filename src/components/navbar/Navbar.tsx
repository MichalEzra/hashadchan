import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/Paths';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
      </div>

      <div className={styles.login}>
        <Link to={PATHS.login}>
          <span role="img" aria-label="User">התחברות👤</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

