import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCandidates, updateCandidateThunk } from '../../redux/thunks/candidates.thunks';
import styles from '../style/UserManagementPage.module.css';
import { CandidateDto } from '../../types/candidateDto.types';
import { Pencil, Trash } from 'lucide-react';
import { deleteCandidate, updateCandidate } from '../../services/candidate.service';
import {
  Gender, candidateSector, SubSector, TorahStudy, EducationInstitution, Occupation,
  Language, Openness, ClothingStyle, Physique, SkinTone, HairColor, ParentsStatus,
  HeadCovering, PhoneType, Smoking
} from '../../types/enums';

const CandidateManagementPage = () => {
  const dispatch = useAppDispatch();
  const { candidates = [], loading, error } = useAppSelector((state) => state.candidates) || {};
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const filteredCandidates = candidates
    .filter((c: CandidateDto) => {
      if (user?.userType === 'PARENT') {
        return c.userId === Number(user.id);
      }
      return true; // אם המשתמש הוא ADMIN או MATCHMAKER – הצג את כל המועמדים
    })
    .filter((c: CandidateDto) =>
      `${c.firstName} ${c.lastName}`.includes(search)
    );

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('האם את בטוחה שברצונך למחוק את המועמד?');
    if (confirmDelete) {
      await deleteCandidate(id);
      dispatch(fetchCandidates());
    }
  };

  const handleEditClick = (candidate: CandidateDto) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {

    if (!selectedCandidate || !selectedCandidate.id) return;
    try {
      const formData = convertCandidateToFormData(selectedCandidate);
      await dispatch(updateCandidateThunk({ id: selectedCandidate.id, data: formData })).unwrap();

      alert("המועמד עודכן בהצלחה!");
      dispatch(fetchCandidates());
      setShowModal(false);
      setSelectedCandidate(null);
    } catch (error: any) {
      console.error("שגיאה בעדכון המועמד:", error.response?.data);
      alert("אירעה שגיאה בעת עדכון המועמד. בדקי את הנתונים ונסי שוב.");
    }

  };
  function convertCandidateToFormData(candidate: CandidateDto): FormData {
    const formData = new FormData();

    for (const key in candidate) {
      const value = candidate[key as keyof CandidateDto];
      if (value !== undefined && value !== null) {
        if (typeof value === 'boolean') {
          formData.append(key, value ? 'true' : 'false');
        } else {
          formData.append(key, value.toString());
        }
      }
    }

    return formData;
  }

  const renderSelect = (
    label: string,
    field: keyof CandidateDto,
    options: Record<string, string | number>
  ) => (
    <label>
      {label}:
      <select
        value={selectedCandidate?.[field]?.toString() ?? ''}
        onChange={(e) =>
          setSelectedCandidate({
            ...selectedCandidate!,
            [field]: e.target.value as any,
          })
        }
      >
        <option value="">בחר</option>
        {Object.values(options).map((opt) => (
          <option key={opt.toString()} value={opt.toString()}>
            {opt.toString()}
          </option>
        ))}
      </select>
    </label>
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

      {filteredCandidates.length === 0 ? (
        <p className={styles.noUsers}>לא נמצאו מועמדים להצגה כרגע.</p>
      ) : (
        <div className={styles.grid}>
          {filteredCandidates.map((c: CandidateDto) => (
            <div key={c.id} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.avatarPlaceholder}>
                  {c.firstName ? c.firstName[0] : ''}
                </div>
                <div className={styles.nameType}>
                  <h3 className={styles.name}>{c.firstName} {c.lastName}</h3>
                  <p className={styles.type}>{c.gender}</p>
                </div>
              </div>

              <ul className={styles.details}>
                <li><strong>אימייל:</strong> {c.email}</li>
                <li><strong>טלפון:</strong> {c.phoneNumber}</li>
                <li><strong>גיל:</strong> {c.age}</li>
                <li><strong>סטטוס:</strong> {c.status ? 'פעיל' : 'לא פעיל'}</li>
                <li><strong>מגזר:</strong> {c.candidateSector}</li>
                <li><strong>תת מגזר:</strong> {c.subSector}</li>
                <li><strong>עיר:</strong> {c.city}</li>
                <li><strong>מוצא:</strong> {c.origin}</li>
                <li><strong>גובה:</strong> {c.height}</li>
                <li><strong>מבנה גוף:</strong> {c.physique}</li>
                <li><strong>צבע עור:</strong> {c.skinTone}</li>
                <li><strong>צבע שיער:</strong> {c.hairColor}</li>
                <li><strong>לימוד תורה:</strong> {c.torahLearning}</li>
                <li><strong>מוסד לימודים:</strong> {c.education}</li>
                <li><strong>עיסוק:</strong> {c.jobOrStudies}</li>
                <li><strong>שפות:</strong> {c.languages}</li>
                <li><strong>פתיחות:</strong> {c.religiousOpenness}</li>
                <li><strong>לבוש:</strong> {c.clothingStyle}</li>
                <li><strong>כיסוי ראש:</strong> {c.preferredHeadCovering}</li>
                <li><strong>זקן:</strong> {c.beard ? 'כן' : 'לא'}</li>
                <li><strong>סטטוס הורים:</strong> {c.familyStatus}</li>
                <li><strong>סוג טלפון:</strong> {c.candidatePhoneType}</li>
                <li><strong>עישון:</strong> {c.smokingStatus}</li>
                <li><strong>רישיון נהיגה:</strong> {c.license ? 'כן' : 'לא'}</li>
                <li><strong>נותנים:</strong> {c.giving}</li>
                <li><strong>דורשים:</strong> {c.expecting}</li>
                <li><strong>זמין להצעות:</strong> {c.availableForProposals ? 'כן' : 'לא'}</li>
              </ul>

              <div className={styles.actions}>
                {(user?.userType === 'PARENT' && c.userId === Number(user?.id)) && (
                  <button onClick={() => handleEditClick(c)} className={styles.editBtn}>
                    <Pencil size={16} /> עריכה
                  </button>
                )}
                <button onClick={() => handleDelete(c.id)} className={styles.deleteBtn}>
                  <Trash size={16} /> מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedCandidate && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>עריכת מועמד</h3>
            <div className={styles.scrollableContent}>
              <label>
                שם פרטי:
                <input
                  value={selectedCandidate.firstName}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, firstName: e.target.value })}
                />
              </label>
              <label>
                שם משפחה:
                <input
                  value={selectedCandidate.lastName}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, lastName: e.target.value })}
                />
              </label>
              <label>
                אימייל:
                <input
                  value={selectedCandidate.email?? ''}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, email: e.target.value })}
                />
              </label>

              <label>
                עיר:
                <input
                  value={selectedCandidate.city}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, city: e.target.value })}
                />
              </label>
              <label>
                גיל:
                <input
                  type="number"
                  value={selectedCandidate.age}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, age: Number(e.target.value) })}
                />
              </label>
              <label>
                מוצא:
                <input
                  value={selectedCandidate.origin}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, origin: e.target.value })}
                />
              </label>
              <label>
                גובה:
                <input
                  type="number"
                  value={selectedCandidate.height}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, height: Number(e.target.value) })}
                />
              </label>
              {renderSelect('מגדר', 'gender', Gender)}
              {renderSelect('מגזר', 'candidateSector', candidateSector)}
              {renderSelect('תת מגזר', 'subSector', SubSector)}
              {renderSelect('לימוד תורה', 'torahLearning', TorahStudy)}
              {renderSelect('מוסד לימודים', 'education', EducationInstitution)}
              {renderSelect('עיסוק', 'jobOrStudies', Occupation)}
              {renderSelect('שפות', 'languages', Language)}
              {renderSelect('פתיחות', 'religiousOpenness', Openness)}
              {renderSelect('לבוש', 'clothingStyle', ClothingStyle)}
              {renderSelect('מבנה גוף', 'physique', Physique)}
              {renderSelect('צבע עור', 'skinTone', SkinTone)}
              {renderSelect('צבע שיער', 'hairColor', HairColor)}
              {renderSelect('כיסוי ראש', 'preferredHeadCovering', HeadCovering)}
              {renderSelect('סטטוס הורים', 'familyStatus', ParentsStatus)}
              {renderSelect('סוג טלפון', 'candidatePhoneType', PhoneType)}
              {renderSelect('עישון', 'smokingStatus', Smoking)}
              <label>
                נותנים:
                <input
                  type="number"
                  value={selectedCandidate.giving ?? ''}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, giving: Number(e.target.value) })}
                />
              </label>
              <label>
                דורשים:
                <input
                  type="number"
                  value={selectedCandidate.expecting ?? ''}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, expecting: Number(e.target.value) })}
                />
              </label>
              <label>
                תיאור עצמי:
                <textarea
                  value={selectedCandidate.descriptionSelf}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, descriptionSelf: e.target.value })}
                />
              </label>
<label>
  תיאור בן/בת זוג רצוי:
  <textarea
    value={selectedCandidate.descriptionFind}
    onChange={(e) => setSelectedCandidate({ ...selectedCandidate, descriptionFind: e.target.value })}
  />
</label>

              <label>
                זמין להצעות:
                <input
                  type="checkbox"
                  checked={selectedCandidate.availableForProposals}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, availableForProposals: e.target.checked })}
                />
              </label>
              <label>
                זקן:
                <input
                  type="checkbox"
                  checked={selectedCandidate.beard}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, beard: e.target.checked })}
                />
              </label>
              <label>
                רישיון נהיגה:
                <input
                  type="checkbox"
                  checked={selectedCandidate.license}
                  onChange={(e) => setSelectedCandidate({ ...selectedCandidate, license: e.target.checked })}
                />
              </label>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => handleSaveEdit()}>שמור</button>
              <button onClick={() => setShowModal(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateManagementPage;

