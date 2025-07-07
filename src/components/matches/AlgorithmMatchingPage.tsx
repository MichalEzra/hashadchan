import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store'; // ודא ייבוא נכון של useAppDispatch ו-useAppSelector
import { fetchMaleMatches, fetchFemaleMatches, createNewMatch } from '../../redux/thunks/matches.thunks';
import { clearMatchCreationMessage } from '../../redux/slice/matchSlice';
import { CandidateDto } from '../../types/candidateDto.types'; // ייבוא CandidateDto שלך
import styles from '../design/AlgorithmMatchingPage.module.css'; // נתיב לקובץ ה-CSS החדש שתיצור עבור עמוד זה

const AlgorithmMatchingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { maleMatches, femaleMatches, loading, error, matchCreationMessage } = useAppSelector((state) => state.matches);
  const [displayType, setDisplayType] = useState<'male' | 'female' | null>(null);

  useEffect(() => {
    if (matchCreationMessage) {
      alert(matchCreationMessage);
      dispatch(clearMatchCreationMessage());
    }
    if (error) {
      alert(`שגיאה: ${error}`);
      dispatch(clearMatchCreationMessage()); // נקה הודעת שגיאה לאחר הצגה
    }
  }, [matchCreationMessage, error, dispatch]);

  const handleFetchMaleMatches = () => {
    dispatch(fetchMaleMatches());
    setDisplayType('male');
  };

  const handleFetchFemaleMatches = () => {
    dispatch(fetchFemaleMatches());
    setDisplayType('female');
  };

  const handleCreateMatch = async (candidate1Id: number, candidate2Id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך ליצור שידוך זה?')) {
      await dispatch(createNewMatch({ idCandidate1: candidate1Id, idCandidate2: candidate2Id}));
    }
  };

  const renderCandidateDetails = (candidate: CandidateDto) => (
    <div className={styles.candidateDetails}>
      <p><strong>שם:</strong> {candidate.firstName} {candidate.lastName}</p>
      <p><strong>גיל:</strong> {candidate.age}</p>
      <p><strong>סטטוס:</strong> {candidate.status}</p>
      <p><strong>מגזר:</strong> {candidate.candidateSector}</p> 
      <p><strong>תת-מגזר:</strong> {candidate.subSector}</p>
      <p><strong>עיר:</strong> {candidate.city}</p>
      <p><strong>פתיחות דתית:</strong> {candidate.religiousOpenness}</p>
      <p><strong>סגנון לבוש:</strong> {candidate.clothingStyle}</p>
      <p><strong>גובה:</strong> {candidate.height ? `${candidate.height} מ'` : 'לא צוין'}</p> {/* טיפול בערכים אפשריים של null */}
      <p><strong>מבנה גוף:</strong> {candidate.physique}</p>
      <p><strong>גוון עור:</strong> {candidate.skinTone}</p>
      <p><strong>צבע שיער:</strong> {candidate.hairColor}</p>
      <p><strong>מוצא:</strong> {candidate.origin}</p>
      <p><strong>שפות:</strong> {candidate.languages}</p>
      <p><strong>סטטוס משפחתי (הורים):</strong> {candidate.familyStatus}</p> {/* יש לוודא שהשם הוא familyStatus ב-DTO */}
      <p><strong>כיסוי ראש מועדף:</strong> {candidate.preferredHeadCovering}</p>
      <p><strong>סוג טלפון:</strong> {candidate.candidatePhoneType}</p>
      <p><strong>רישיון נהיגה:</strong> {candidate.license ? 'כן' : 'לא'}</p>
      <p><strong>סטטוס עישון:</strong> {candidate.smokingStatus}</p>
      <p><strong>זקן:</strong> {candidate.beard ? 'כן' : 'לא'}</p>
      <p><strong>לימוד תורה:</strong> {candidate.torahLearning}</p>
      <p><strong>השכלה:</strong> {candidate.education}</p>
      <p><strong>מקום לימודים/עבודה:</strong> {candidate.studyPlaceName}</p>
      <p><strong>עיסוק נוכחי:</strong> {candidate.jobOrStudies}</p>
      <p><strong>נתינה:</strong> {candidate.giving}</p>
      <p><strong>ציפייה:</strong> {candidate.expecting}</p>
      <p><strong>תיאור עצמי:</strong> {candidate.descriptionSelf}</p>
      <p><strong>מחפש/ת:</strong> {candidate.descriptionFind}</p>
      {/* אם יש לך שדות כמו arrImage, fileImage, imageUrl, rezumehArr, rezumehFile, rezumehName, את יכולה להציג אותם כאן לפי הצורך */}
    </div>
  );

  return (
    <div className={styles.container}>
      <h2>הצעות שידוכים (מבוסס אלגוריתם)</h2> {/* שינוי הכותרת כדי להבדיל */}
      <div className={styles.buttons}>
        <button onClick={handleFetchMaleMatches} disabled={loading}>
          קבל הצעות לבנים
        </button>
        <button onClick={handleFetchFemaleMatches} disabled={loading}>
          קבל הצעות לבנות
        </button>
      </div>

      {loading && <p>טוען הצעות...</p>}
      {error && <p className={styles.error}>שגיאה: {error}</p>}

      {displayType === 'male' && maleMatches.length > 0 && (
        <div className={styles.matchList}>
          <h3>הצעות שידוכים לבנים</h3>
          <table className={styles.matchTable}>
            <thead>
              <tr>
                <th>פרטי הבחור</th>
                <th>פרטי הבחורה</th>
                <th>ציון התאמה</th>
                <th>פעולה</th>
              </tr>
            </thead>
            <tbody>
              {maleMatches.map((match, index) => (
                <tr key={index}>
                  <td>{renderCandidateDetails(match.male)}</td>
                  <td>{renderCandidateDetails(match.female)}</td>
                  <td>{match.score}</td>
                  <td>
                    <button onClick={() => handleCreateMatch(match.male.id, match.female.id)}>
                      צור שידוך
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {displayType === 'female' && femaleMatches.length > 0 && (
        <div className={styles.matchList}>
          <h3>הצעות שידוכים לבנות</h3>
          <table className={styles.matchTable}>
            <thead>
              <tr>
                <th>פרטי הבחורה</th>
                <th>פרטי הבחור</th>
                <th>ציון התאמה</th>
                <th>פעולה</th>
              </tr>
            </thead>
            <tbody>
              {femaleMatches.map((match, index) => (
                <tr key={index}>
                  <td>{renderCandidateDetails(match.female)}</td>
                  <td>{renderCandidateDetails(match.male)}</td>
                  <td>{match.score}</td>
                  <td>
                    <button onClick={() => handleCreateMatch(match.female.id, match.male.id)}>
                      צור שידוך
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {displayType && (maleMatches.length === 0 && femaleMatches.length === 0) && !loading && !error && (
        <p>אין הצעות שידוכים להצגה עבור בחירה זו.</p>
      )}
    </div>
  );
};

export default AlgorithmMatchingPage;