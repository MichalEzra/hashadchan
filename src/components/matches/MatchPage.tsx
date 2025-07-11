import React, { useEffect, useState } from 'react';
import styles from '../design/MatchPage.module.css'
import { useAppSelector } from '../../redux/store';
import { CandidateDto } from '../../types/candidateDto.types';
import { createMatch } from '../../services/match.service';
import { getMaleCandidates, getFemaleCandidates } from '../../services/candidate.service';
import { jwtDecode, mapJwtClaims } from '../../auth/auth.utils';
import { loadUserFromToken } from '../../redux/thunks/auth.thunk';

export default function MatchPage() {
  //   const currentUser = useAppSelector(state => state.auth.user);
  const [males, setMales] = useState<CandidateDto[]>([]);
  const [females, setFemales] = useState<CandidateDto[]>([]);
  const [selectedMale, setSelectedMale] = useState<number | null>(null);
  const [selectedFemale, setSelectedFemale] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    getMaleCandidates().then(setMales);
    getFemaleCandidates().then(setFemales);
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token || '');

    if (!decoded) {
      setStatusMessage('לא נמצאה משתמש מחובר');
      return;
    }
    const user = mapJwtClaims(decoded);
    console.log('📦 decoded claims:', decoded);
    console.log('👤 user:', user);

    if (!selectedMale || !selectedFemale || !user?.id) {
      setStatusMessage('יש לבחור מועמד, מועמדת ולהיות מחובר');
      return;
    }

    try {
      // const raw = getUserFromToken();
      // if (!raw) {
      //     setStatusMessage('לא נמצאה משתמש מחובר');
      //     return;
      //     }
      //     const user = mapJwtClaims(raw);
      //     const idMatchmaker = user.nameid.valueOf();
      await createMatch({
        idCandidate1: selectedMale,
        idCandidate2: selectedFemale,
      });

      setStatusMessage('שידוך נשלח בהצלחה!');
    } catch (error: any) {
      console.error('שגיאת שרת:', error.response?.data || error.message);
      setStatusMessage('אירעה שגיאה: ' + (error.response?.data || error.message));
    }

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>יצירת שידוך חדש</h2>

      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>מועמדים</h3>
          <ul className={styles.list}>
            {males.map(c => (
              <li
                key={c.id}
                onClick={() => setSelectedMale(c.id)}
                className={`${styles.item} ${selectedMale === c.id ? styles.selected : ''}`}
              >
                {c.firstName} {c.lastName}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h3>מועמדות</h3>
          <ul className={styles.list}>
            {females.map(c => (
              <li
                key={c.id}
                onClick={() => setSelectedFemale(c.id)}
                className={`${styles.item} ${selectedFemale === c.id ? styles.selected : ''}`}
              >
                {c.firstName} {c.lastName}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        בצע התאמה
      </button>

      {statusMessage && <p className={styles.message}>{statusMessage}</p>}
    </div>
  );
}

