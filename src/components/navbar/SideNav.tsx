import React, { useEffect, useState } from 'react';
import styles from './sideNav.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router';
import { fetchCandidates } from '../../redux/thunks/candidates.thunks';

interface SideNavProps {
  onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const candidates = useAppSelector(state => state.candidates.candidates || []);
  const currentUser = useAppSelector(state => state.auth.user);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const userType = useAppSelector(state => state.auth.user?.userType);
  const [isOpen, setIsOpen] = useState(false); // מצב פתיחה/סגירה של התפריט

  const navigate = useNavigate();

  useEffect(() => {
    if (userType === 'PARENT') {
      dispatch(fetchCandidates());
    }
  }, [dispatch, userType]);

  useEffect(() => {
    if (userType === 'PARENT' && candidates.length > 0 && selectedCandidateId === null) {
      const myCandidates = candidates.filter(c => c.userId === Number(currentUser?.id));
      if (myCandidates.length > 0) {
        setSelectedCandidateId(myCandidates[0].id);
      }
    }
  }, [candidates, currentUser, userType]);

  const renderButtons = () => {
    switch (userType) {
      case 'ADMIN':
        return (
          <>
            <button className={styles.adminButton} onClick={() => navigate('/users')}>ניהול משתמשים</button>
            <button className={styles.adminButton} onClick={() => navigate('/candidates')}>ניהול מועמדים</button>
            <button className={styles.adminButton} onClick={() => navigate('/matchmakers')}>ניהול שדכנים</button>
            <button className={styles.adminButton} onClick={() => navigate('/matchmaker/new')}>הוספת שדכן</button>
          </>
        );
      case 'MATCHMAKER':
        return (
          <>
            <button className={styles.adminButton} onClick={() => navigate('/candidates')}>ניהול מועמדים</button>
            <button className={styles.adminButton} onClick={() => navigate('/match')}>התאמת מועמדים</button>
            <button className={styles.adminButton} onClick={() => navigate('/algorithm-match')}>התאמת מועמדים ע"י אלגוריתם</button>
          </>
        );
      case 'PARENT':
        const myCandidates = candidates.filter(c => c.userId === Number(currentUser?.id));
        return (
          <>
            <button className={styles.adminButton} onClick={() => navigate('/candidates/new')}>הוספת מועמד</button>
            <button className={styles.adminButton} onClick={() => navigate('/candidates')}>צפייה בפרטי המועמדים</button>

            {myCandidates.length > 0 && (
              <div className={styles.selector}>
                <label>בחר מועמד:</label>
                <select
                  value={selectedCandidateId ?? ''}
                  onChange={(e) => setSelectedCandidateId(Number(e.target.value))}
                >
                  {myCandidates.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.firstName} {c.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              className={styles.adminButton}
              onClick={() => navigate(`/suggestions?candidateId=${selectedCandidateId}`)}
              disabled={!selectedCandidateId}
            >
              הצעות עבור המועמד
            </button>
          </>
        );
      default:
        return <p>אין הרשאות זמינות</p>;
    }
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={() => setIsOpen(prev => !prev)}>
        ☰ תפריט
      </button>

      <div className={`${styles.sideNav} ${isOpen ? styles.open : ''}`}>
        {renderButtons()}
      </div>

      {/* סגירה בלחיצה מחוץ לתפריט במסך קטן */}
      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default SideNav;
