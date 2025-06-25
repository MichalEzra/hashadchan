import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCandidates, deleteCandidateById, updateCandidate } from '../../redux/thunks/candidates.thunks';
import styles from '../style/CandidateManagementPage.module.css';
import { Candidate } from '../../types/candidate.types';
import { Pencil, Trash } from 'lucide-react'; // אייקונים לעריכה ומחיקה
import { ENDPOINTS } from '../../api/endpoints';
// import { updateCandidateById } from '../../services/candidate.service';
// import { useNavigate } from 'react-router';

const CandidateManagementPage = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { candidates = [], loading, error } = useAppSelector((state) => state.candidates) || {};
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('האם את בטוחה שברצונך למחוק את המועמד?');
    if (confirmDelete) {
      await dispatch(deleteCandidateById(id));
      dispatch(fetchCandidates());
    }
  };

  const handleEdit = async(id: number) => {
    const candidate = candidates.find(c => c.id === id);
if (!candidate) return;

    const formData = convertCandidateToFormData(candidate);
    await dispatch(updateCandidate({ id: candidate.id, data: formData }));

    dispatch(fetchCandidates());
  };

  function convertCandidateToFormData(candidate: any): FormData {
  const formData = new FormData();

  for (const key in candidate) {
    const value = candidate[key];
    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        formData.append(key, value); // קובץ
      } else {
        formData.append(key, value.toString()); // מחרוזת/מספר
      }
    }
  }

  return formData;
}

  const formatBoolean = (value: boolean | undefined) => (value ? 'כן' : 'לא');

  const filteredCandidates = candidates.filter((c: Candidate) =>
    `${c.firstName} ${c.lastName}`.includes(search)
  );

  if (loading) return <p className={styles.loading}>טוען נתונים...</p>;
  if (error) return <p className={styles.error}>שגיאה: {error}</p>;

  return (
    <div className={styles.page} dir="rtl">
      <h2 className={styles.title}>ניהול מועמדים</h2>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="חיפוש לפי שם..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCandidates.length === 0 && !loading && !error ? (
        <p className={styles.noCandidates}>לא נמצאו מועמדים להצגה כרגע.</p>
      ) : (
        <div className={styles.grid}>
          {filteredCandidates.map((c: Candidate) => (
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
                {/* <li><strong>מגדר:</strong> {c.gender}</li> */}
                <li><strong>מגזר:</strong> {c.sector}</li>
                <li><strong>תת מגזר:</strong> {c.subSector}</li>
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
                <li><strong>סטטוס הורים:</strong> {c.familyStatus}</li>
                <li><strong>סוג טלפון:</strong> {c.phoneType}</li>
                <li><strong>עישון:</strong> {c.smokingStatus}</li>
                <li><strong>רישיון נהיגה:</strong> {formatBoolean(c.license)}</li>
                <li><strong>נותנים (מקסימום) :</strong> <span className={styles.giving}>{c.giving}</span></li>
                <li><strong>דורשים (מינימום) :</strong> <span className={styles.expecting}>{c.expecting}</span></li>
                <li><strong>זמין להצעות:</strong> {formatBoolean(c.availableForProposals)}</li>
              </ul>
              {/* צפייה בקבצים */}
              <div className={styles.files}>
                  {c.imageUrl && (
                    <a
                      href={`${ENDPOINTS.getImage}/${c.imageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      📷 לצפייה בתמונה
                    </a>
                  )}

                  {c.rezumehName && (
                    <a
                      href={`${ENDPOINTS.getResume}/${c.rezumehName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      📄 לצפייה ברזומה
                    </a>
                  )}
                </div>


              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => handleEdit(c.id)}>
                  <Pencil size={16} /> עריכה
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(c.id)}>
                  <Trash size={16} /> מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateManagementPage;
