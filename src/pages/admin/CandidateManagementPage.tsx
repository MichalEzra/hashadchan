import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCandidates } from '../../redux/thunks/candidates.thunks';
import styles from './CandidateManagementPage.module.css'; // ייבוא ה-CSS Module
import { Candidate } from '../../types/candidate.types';

const CandidateManagementPage = () => {
  const dispatch = useAppDispatch();
  const { candidates = [], loading, error } = useAppSelector((state) => state.candidates) || {};

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const formatBoolean = (value: boolean | undefined) => (value ? 'כן' : 'לא');

  if (loading) return <p className={styles.loading}>טוען נתונים...</p>;
  if (error) return <p className={styles.error}>שגיאה: {error}</p>;

  return (
    <div className={styles.page} dir="rtl">
      <h2 className={styles.title}>ניהול מועמדים</h2>

      {candidates.length === 0 && !loading && !error ? (
        <p className={styles.noCandidates}>לא נמצאו מועמדים להצגה כרגע.</p>
      ) : (
        <div className={styles.grid}>
          {candidates.map((c: Candidate) => (
            <div key={c.id} className={styles.card}>
              <div className={styles.header}>
                {c.imageUrl ? (
                  <img
                    src={c.imageUrl}
                    alt={`${c.firstName} ${c.lastName}`}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {c.firstName ? c.firstName[0] : ''}
                  </div>
                )}
                <div className={styles.nameStatus}>
                  <h3 className={styles.name}>{c.firstName} {c.lastName}</h3>
                  <p className={styles.status}>{c.status}</p>
                </div>
              </div>

              <ul className={styles.details}>
                <li><strong>גיל:</strong> {c.age}</li>
                <li><strong>מגדר:</strong> {c.gender}</li>
                <li><strong>מגזר:</strong> {c.sector} - {c.subSector}</li>
                <li><strong>עיר:</strong> {c.city}</li>
                <li><strong>מוצא:</strong> {c.origin}</li>
                <li><strong>גובה:</strong> {c.height} ס"מ</li>
                <li><strong>מבנה גוף:</strong> {c.physique}</li>
                <li><strong>צבע עור:</strong> {c.skinTone}</li>
                <li><strong>צבע שיער:</strong> {c.hairColor}</li>
                <li><strong>לימוד תורה:</strong> {c.torahLearning}</li>
                <li><strong>מוסד לימודים:</strong> {c.education}</li>
                <li><strong>עיסוק:</strong> {c.occupation}</li>
                <li><strong>שפות:</strong> {Array.isArray(c.languages) && c.languages.length > 0 ? c.languages.join(', ') : 'לא צוין'}</li>
                <li><strong>פתיחות:</strong> {c.openness}</li>
                <li><strong>סגנון לבוש:</strong> {c.clothingStyle}</li>
                <li><strong>כיסוי ראש:</strong> {c.headCovering}</li>
                <li><strong>זקן:</strong> {formatBoolean(c.beard)}</li>
                <li><strong>סטטוס משפחתי:</strong> {c.familyStatus}</li>
                <li><strong>סוג טלפון:</strong> {c.phoneType}</li>
                <li><strong>עישון:</strong> {c.smokingStatus}</li>
                <li><strong>רישיון נהיגה:</strong> {formatBoolean(c.license)}</li>
                <li><strong>רמת נתינה:</strong> <span className={styles.giving}>{c.giving}</span></li>
                <li><strong>רמת ציפיות:</strong> <span className={styles.expecting}>{c.expecting}</span></li>
                <li><strong>זמין להצעות:</strong> {formatBoolean(c.availableForProposals)}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateManagementPage;
