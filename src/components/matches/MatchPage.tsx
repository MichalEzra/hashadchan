import React, { useEffect, useState } from 'react';
import styles from './style/MatchPage.module.css';
import { useAppSelector } from '../../redux/store';
import { Candidate } from '../../types/candidate.types';
import { createMatch } from '../../services/match.service';
import { getMaleCandidates, getFemaleCandidates } from '../../services/candidate.service';
import { getUserFromToken, mapJwtClaims } from '../../auth/auth.utils';

export default function MatchPage() {
//   const currentUser = useAppSelector(state => state.auth.user);
  const [males, setMales] = useState<Candidate[]>([]);
  const [females, setFemales] = useState<Candidate[]>([]);
  const [selectedMale, setSelectedMale] = useState<number | null>(null);
  const [selectedFemale, setSelectedFemale] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    getMaleCandidates().then(setMales);
    getFemaleCandidates().then(setFemales);
  }, []);

  const handleSubmit = async () => {
    const currentUser = getUserFromToken();
    if (!currentUser) {
        setStatusMessage('לא נמצאה משתמש מחובר');
        return;
        }
    const user = mapJwtClaims(currentUser);
    console.log('currentUser:', currentUser);
    if (!selectedMale || !selectedFemale || !user?.nameid) {
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
    } catch (error) {
      console.error(error);
      setStatusMessage('אירעה שגיאה בשליחת השידוך');
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

