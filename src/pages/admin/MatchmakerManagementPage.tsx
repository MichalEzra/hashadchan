// src/pages/MatchmakerManagementPage.tsx
import { useEffect, useState } from 'react';
import styles from '../style/UserManagementPage.module.css'; // צור קובץ CSS Module תואם
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchMatchmakers } from '../../redux/thunks/matchmaker.thunks';
import { Matchmaker } from '../../types/matchmaker.types';

export default function MatchmakerManagementPage() {
  const dispatch = useAppDispatch();
  const { matchmakers, loading, error } = useAppSelector(state => state.matchmakers);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchMatchmakers());
  }, [dispatch]);

 const filtered = matchmakers.filter((m: Matchmaker) =>
  `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
);

  if (loading) return <p className={styles.loading}>טוען נתונים...</p>;
  if (error) return <p className={styles.error}>שגיאה: {error}</p>;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>ניהול שדכנים</h2>
      <input
        className={styles.searchInput}
        placeholder="חיפוש לפי שם"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>טוען...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.cardContainer}>
        {filtered.map(m => (
          <div key={m.id} className={styles.card}>
            <h3>{m.firstName} {m.lastName}</h3>
            <p><strong>טלפון:</strong> {m.phoneNumber}</p>
            <p><strong>מין:</strong> {m.matchmakerGender}</p>
            <p><strong>מגזר:</strong> {m.matchmakerSector}</p>
            <p><strong>שנות ניסיון:</strong> {m.yearsOfExperience ?? '—'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
