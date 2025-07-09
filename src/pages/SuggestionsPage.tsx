// // import React, { useEffect, useState } from 'react';
// // import { useAppDispatch, useAppSelector } from '../redux/store';
// // import { fetchMyCandidate } from '../redux/thunks/candidates.thunks';
// // import { fetchMaleMatches, fetchFemaleMatches } from '../redux/thunks/matches.thunks';
// // import { CandidateDto, MatchResultsDto } from '../types/candidateDto.types';
// // import styles from './style/SuggestionsPage.module.css'

// // const SuggestionsPage: React.FC = () => {
// //     const dispatch = useAppDispatch();
// //     const user = useAppSelector(state => state.auth.user);
// //     const candidate = useAppSelector(state => state.candidates.currentCandidate);
// //     const matchesMale = useAppSelector(state => state.matches.maleMatches);
// //     const matchesFemale = useAppSelector(state => state.matches.femaleMatches);
// //     const isLoadingCandidate = useAppSelector(state => state.candidates.loading);
// //     const isLoadingMatches = useAppSelector(state => state.matches.loading);

// //     // const [suggestions, setSuggestions] = useState<MatchResultsDto[]>([]);

// //     useEffect(() => {
// //         if (user?.id) {
// //             dispatch(fetchMyCandidate(Number(user.id)));
// //         }
// //     }, [dispatch, user?.id]);
// // useEffect(() => {
// //     if (!candidate) return;

// //     if (candidate.gender === 'נקבה') {
// //         dispatch(fetchMaleMatches());
// //     } else {
// //         dispatch(fetchFemaleMatches());
// //     }
// // }, [candidate, dispatch]);
// // const suggestions = candidate?.gender === 'נקבה' ? matchesMale : matchesFemale;

// //     const getOtherCandidate = (match: MatchResultsDto) =>
// //         candidate?.gender === 'נקבה' ? match.male : match.female;

// //     const getCandidateSummary = (c: CandidateDto) => {
// //         if (!c) return '';

// //         const lines = [
// //             `שם מוסד הלימודים: ${c.studyPlaceName}`,
// //             `גיל: ${c.age}`,
// //             `עיר: ${c.city}`,
// //             `מצב אישי: ${c.status}`,
// //             `מגזר: ${c.candidateSector}`,
// //             `תת מגזר: ${c.subSector}`,
// //             `מוצא: ${c.origin}`,
// //             `פתיחות דתית: ${c.religiousOpenness}`,
// //             `סגנון לבוש: ${c.clothingStyle}`,
// //             `עיסוק/לימודים: ${c.jobOrStudies}`,
// //             `מוסד לימודים: ${c.education}`,
// //             c.gender === 'נקבה'
// //                 ? `כיסוי ראש מועדף: ${c.preferredHeadCovering}`
// //                 : [
// //                     `רמת לימוד תורה: ${c.torahLearning}`,
// //                     `רישיון נהיגה: ${c.license ? 'כן' : 'לא'}`,
// //                     `זקן: ${c.beard ? 'כן' : 'לא'}`,
// //                     `סטטוס עישון: ${c.smokingStatus}`,
// //                 ].join('\n'),
// //             `מה הוא מחפש: ${c.descriptionFind}`,
// //         ];

// //         return lines.filter(Boolean).join('\n');
// //     };



// // return (
// //   <div className={styles.suggestionsContainer}>
// //     <h2 className={styles.title}>הצעות עבורך</h2>

// //     {isLoadingCandidate && <p className={styles.loading}>טוען מועמד...</p>}
// //     {isLoadingMatches && <p className={styles.loading}>טוען הצעות...</p>}

// //     {!isLoadingCandidate && !candidate && <p className={styles.message}>לא נמצא מועמד מחובר.</p>}

// //     {suggestions.length === 0 && !isLoadingMatches && (
// //       <p className={styles.message}>אין הצעות זמינות כרגע.</p>
// //     )}

// //     <div className={styles.grid}>
// //       {suggestions.map((match, idx) => {
// //         const other = getOtherCandidate(match);
// //         return (
// //           <div key={idx} className={styles.card}>
// //             <pre>{getCandidateSummary(other)}</pre>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   </div>
// // );
// // }
// // export default SuggestionsPage;
// import { useAppDispatch, useAppSelector } from '../redux/store';
// import { fetchMyCandidate } from '../redux/thunks/candidates.thunks';
// import { fetchMaleMatches, fetchFemaleMatches } from '../redux/thunks/matches.thunks';
// import { CandidateDto, MatchResultsDto } from '../types/candidateDto.types';
// import styles from './style/SuggestionsPage.module.css';
// import { useEffect, useState } from 'react';

// const SuggestionsPage: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const user = useAppSelector(state => state.auth.user);
//     const candidate = useAppSelector(state => state.candidates.currentCandidate);
//     const matchesMale = useAppSelector(state => state.matches.maleMatches);
//     const matchesFemale = useAppSelector(state => state.matches.femaleMatches);
//     const isLoadingCandidate = useAppSelector(state => state.candidates.loading);
//     const isLoadingMatches = useAppSelector(state => state.matches.loading);
//     const [selectedCandidate, setSelectedCandidate] = useState<CandidateDto | null>(null);

//     useEffect(() => {
//         if (user?.id) {
//             dispatch(fetchMyCandidate(Number(user.id)));
//         }
//     }, [dispatch, user?.id]);

//     useEffect(() => {
//         if (!candidate) return;

//         if (candidate.gender === 'נקבה') {
//             dispatch(fetchMaleMatches());
//         } else {
//             dispatch(fetchFemaleMatches());
//         }
//     }, [candidate, dispatch]);

//     const suggestions = candidate?.gender === 'נקבה' ? matchesMale : matchesFemale;
//     const getOtherCandidate = (match: MatchResultsDto) =>
//         candidate?.gender === 'נקבה' ? match.male : match.female;

//     return (
//         <div className={styles.suggestionsContainer}>
//             <h2 className={styles.title}>הצעות עבורך</h2>

//             {isLoadingCandidate && <p className={styles.loading}>טוען מועמד...</p>}
//             {isLoadingMatches && <p className={styles.loading}>טוען הצעות...</p>}
//             {!isLoadingCandidate && !candidate && <p className={styles.message}>לא נמצא מועמד מחובר.</p>}
//             {suggestions.length === 0 && !isLoadingMatches && (
//                 <p className={styles.message}>אין הצעות זמינות כרגע.</p>
//             )}

//             <div className={styles.suggestionsLayout}>
//                 {/* הגריד של הכרטיסים */}
//                 <div className={styles.grid}>
//                     {suggestions.map((match, idx) => {
//                         const other = getOtherCandidate(match);
//                         if (!other) return null;

//                         return (
//                             <div
//                                 key={idx}
//                                 className={styles.card}
//                                 onClick={() => setSelectedCandidate(other)}
//                             >
//                                 <div className={styles.cardHeader}>
//                                     <div className={styles.profileImageContainer}>
//                                         {/* תמונת פרופיל בעתיד */}
//                                         <span className={styles.candidateId}>{other.id}</span>
//                                     </div>
//                                     <div className={styles.starIcon}>⭐</div>
//                                 </div>
//                                 <div className={styles.candidateMainInfo}>
//                                     <div className={styles.nameAndAge}>
//                                         <span className={styles.name}>{other.firstName} {other.lastName}</span>
//                                         <span className={styles.age}> - {other.age}</span>
//                                         <span className={styles.dot}>•</span>
//                                         <span className={styles.city}>{other.city}</span>
//                                     </div>
//                                     <div className={styles.sector}>{other.candidateSector} {other.subSector}</div>
//                                 </div>
//                                 <div className={styles.detailsSection}>
//                                     <div className={styles.detailRow}>
//                                         <span className={styles.detailLabel}>מצב אישי:</span>
//                                         <span className={styles.detailValue}>{other.status}</span>
//                                     </div>
//                                     {other.gender === 'זכר' && (
//                                         <div className={styles.detailRow}>
//                                             <span className={styles.detailLabel}>לימוד תורה:</span>
//                                             <span className={styles.detailValue}>{other.torahLearning}</span>
//                                         </div>
//                                     )}
//                                     <div className={styles.detailRow}>
//                                         <span className={styles.detailLabel}>על בת/בן הזוג שאני מחפש:</span>
//                                         <span className={styles.detailValue}>{other.descriptionFind}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* חלונית פרטים בצד */}
//                 {selectedCandidate && (
//                     <div className={styles.detailsPanel}>
//                         <div className={styles.detailsHeader}>
//                             <button className={styles.closeButton} onClick={() => setSelectedCandidate(null)}>❌</button>
//                             <h3>{selectedCandidate.firstName} {selectedCandidate.lastName}</h3>
//                         </div>

//                         <div className={styles.detailsBody}>
//                             <p><strong>גיל:</strong> {selectedCandidate.age}</p>
//                             <p><strong>עיר:</strong> {selectedCandidate.city}</p>
//                             <p><strong>מגזר:</strong> {selectedCandidate.candidateSector} / {selectedCandidate.subSector}</p>
//                             <p><strong>סטטוס:</strong> {selectedCandidate.status}</p>
//                             <p><strong>לימוד תורה:</strong> {selectedCandidate.torahLearning}</p>
//                             <p><strong>מה הוא מחפש:</strong> {selectedCandidate.descriptionFind}</p>
//                         </div>

//                         <button className={styles.interestButton}>זה מעניין אותי</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SuggestionsPage;

// SuggestionsPage.tsx
// SuggestionsPage.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchMyCandidate } from '../redux/thunks/candidates.thunks';
import { fetchMaleMatches, fetchFemaleMatches, sendInterest } from '../redux/thunks/matches.thunks';
import { CandidateDto, MatchResultsDto } from '../types/candidateDto.types';
import styles from './style/SuggestionsPage.module.css';
import SideModal from './SideModal';

const SuggestionsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const candidate = useAppSelector(state => state.candidates.currentCandidate);
    const matchesMale = useAppSelector(state => state.matches.maleMatches);
    const matchesFemale = useAppSelector(state => state.matches.femaleMatches);
    const isLoadingCandidate = useAppSelector(state => state.candidates.loading);
    const isLoadingMatches = useAppSelector(state => state.matches.loading);
    const [selectedCandidate, setSelectedCandidate] = useState<CandidateDto | null>(null);
    const [candidateDetails, setCandidateDetails] = useState<string>('');    // המידע המפורט מהשרת
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchMyCandidate(Number(user.id)));
        }
    }, [dispatch, user?.id]);

    useEffect(() => {
        if (!candidate) return;
        // כאשר המשתמש המחובר הוא נקבה, אנחנו רוצים להביא התאמות של גברים (MaleMatches)
        // וכאשר המשתמש המחובר הוא זכר, אנחנו רוצים להביא התאמות של נשים (FemaleMatches)
        if (candidate.gender === 'נקבה') {
            dispatch(fetchMaleMatches()); // תיקון כאן: נקבה רואה בנים
        } else {
            dispatch(fetchFemaleMatches()); // תיקון כאן: זכר רואה בנות
        }
    }, [candidate, dispatch]);

    useEffect(() => {
        if (!selectedCandidate) {
            setCandidateDetails('');
            return;
        }

        setLoadingDetails(true);
        fetch(`/api/candidate/${selectedCandidate.id}/general-info`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch candidate info');
                return res.text();
            })
            .then(text => setCandidateDetails(text))
            .catch(() => setCandidateDetails('לא ניתן לקבל את פרטי המועמד'))
            .finally(() => setLoadingDetails(false));
    }, [selectedCandidate]);

    // גם כאן צריך לתקן: אם המשתמש הוא נקבה, הוא רואה הצעות של גברים (matchesMale)
    // אם המשתמש הוא זכר, הוא רואה הצעות של נשים (matchesFemale)
    const suggestions = candidate?.gender === 'נקבה' ? matchesMale : matchesFemale;

    const getMaleOfFemale = () => {

    }
    // וגם כאן, כדי לוודא שמוצג המועמד השני בזוג ההתאמה
    const getOtherCandidate = (match: MatchResultsDto) =>
        candidate?.gender === 'נקבה' ? match.male : match.female; // נקבה רואה את ה-male בזוג, זכר רואה את ה-female בזוג

    const [sending, setSending] = useState(false);
    const [sentMessage, setSentMessage] = useState<string | null>(null);

    const handleSendInterest = async () => {
        if (!candidate || !selectedCandidate) return;

        setSending(true);
        setSentMessage(null);

        try {
            await dispatch(sendInterest({
                senderId: candidate.id,
                receiverId: selectedCandidate.id
            })).unwrap();

            setSentMessage('ההצעה נשלחה בהצלחה!');
        } catch (error) {
            console.error(error);
            setSentMessage('שגיאה בשליחת ההצעה');
        } finally {
            setSending(false);
        }
    };


    return (
        <div className={styles.pageLayout}>
            <div className={styles.suggestionsContainer}>
                <h2 className={styles.title}>הצעות עבורך</h2>

                {isLoadingCandidate && <p className={styles.loading}>טוען מועמד...</p>}
                {isLoadingMatches && <p className={styles.loading}>טוען הצעות...</p>}

                {!isLoadingCandidate && !candidate && (
                    <p className={styles.message}>לא נמצא מועמד מחובר.</p>
                )}

                {suggestions.length === 0 && !isLoadingMatches && (
                    <p className={styles.message}>אין הצעות זמינות כרגע.</p>
                )}

                <div className={styles.grid}>
                    {suggestions.map((match, idx) => {
                        const other = getOtherCandidate(match);
                        if (!other) return null;

                        return (
                            <div
                                key={idx}
                                className={styles.card}
                                onClick={() => setSelectedCandidate(other)}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.profileImageContainer}>
                                        <div className={styles.profileImageContainer}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="42"
                                                height="42"
                                                viewBox="0 0 24 24"
                                                fill="#6b7280"
                                            >
                                                <path d="M12 2a5 5 0 0 1 5 5v1a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5zm0 14c4.418 0 8 2.239 8 5v1H4v-1c0-2.761 3.582-5 8-5z" />
                                            </svg>
                                        </div>
                                        {/* תמונת פרופיל בעתיד */}
                                        <span className={styles.candidateId}>{other.id}</span>
                                    </div>
                                    {/* <div className={styles.starIcon}>⭐</div> */}
                                </div>
                                <div className={styles.candidateMainInfo}>
                                    <div className={styles.nameAndAge}>
                                        <div className={styles.ageCityContainer}>
                                            <span className={styles.age}>{other.age} שנים</span>
                                            <span className={styles.city}>• {other.city}</span>
                                        </div>
                                    </div>

                                    <div className={styles.sector}>{other.candidateSector} {other.subSector}</div>
                                </div>
                                <div className={styles.detailsSection}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>מצב אישי</span>
                                        <span className={styles.detailValue}>{other.status}</span>
                                    </div>
                                    {/* תצוגה מותנית ללימוד תורה עבור זכרים */}
                                    {other.gender === 'זכר' && (
                                        <div className={styles.detailRow}>
                                            <span className={styles.detailLabel}>לימוד תורה</span>
                                            <span className={styles.detailValue}>{other.torahLearning}</span>
                                        </div>
                                    )}
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>על בת/בן הזוג שאני מחפש</span>
                                        <span className={styles.detailValue}>{other.descriptionFind}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* המודל עם פרטים מורחבים, יופיע רק כשנבחר מועמד */}
                <SideModal isOpen={!!selectedCandidate} onClose={() => setSelectedCandidate(null)}>
                    {loadingDetails && <p>טוען פרטי מועמד...</p>}
                    <h1>פרטי המועמד</h1>
                    {!loadingDetails && <pre style={{ whiteSpace: 'pre-wrap' }}>{candidateDetails}</pre>}
                    <button onClick={handleSendInterest} disabled={sending}>
                        {sending ? 'שולח...' : 'זה מעניין אותי'}
                    </button>

                    {sentMessage && <p>{sentMessage}</p>}
                </SideModal>
            </div>
        </div>
    );
};

export default SuggestionsPage;