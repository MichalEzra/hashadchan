import axios from 'axios';
import { CandidateDto, MatchRequest, MatchResultsDto } from "../types/candidateDto.types";
import { EngagedMatch } from '../types/match.types';
const BASE_URL = 'http://localhost:5245/api';

const token = localStorage.getItem('token'); // או איך שאת שומרת אותו

// יצירת שידוך בין מועמד למועמדת על ידי שדכן
export const createMatch = async (request: MatchRequest) => {
    console.log('token:', localStorage.getItem('token'));
    const response = await axios.post(
        `${BASE_URL}/Match`,request,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
//שליחת מייל לצד השני
export const sendSingleMatchRequest = async (data: MatchRequest) => {
  const response = await api.post(`/Match`, data);
  return response.data;
};
// פונקציה לקבלת הצעות שידוכים לבנים
export const getMaleMatchProposals = async (): Promise<MatchResultsDto[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found.');
  }
  const response = await axios.get<MatchResultsDto[]>(
    `${BASE_URL}/HungarianAlgorithm/male`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// פונקציה לקבלת הצעות שידוכים לבנות
export const getFemaleMatchProposals = async (): Promise<MatchResultsDto[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found.');
  }
  const response = await axios.get<MatchResultsDto[]>(
    `${BASE_URL}/HungarianAlgorithm/female`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getEngagedMatches = async (): Promise<EngagedMatch[]> => {
  console.log(`${BASE_URL}/Matches/engaged`);
  const response = await axios.get(`${BASE_URL}/Match/engaged`);
  return response.data;
};



// const getCandidateSummary = (c: CandidateDto) => {
//   if (!c) return '';

//   const lines = [
//     `שם מוסד הלימודים: ${c.studyPlaceName}`,
//     `גיל: ${c.age}`,
//     `עיר: ${c.city}`,
//     `מצב אישי: ${c.status}`,
//     `מגזר: ${c.sector}`,
//     `תת מגזר: ${c.subSector}`,
//     `מוצא: ${c.origin}`,
//     `פתיחות דתית: ${c.religiousOpenness}`,
//     `סגנון לבוש: ${c.clothingStyle}`,
//     `עיסוק/לימודים: ${c.jobOrStudies}`,
//     `מוסד לימודים: ${c.education}`,
//     c.gender === 'נקבה'
//       ? `כיסוי ראש מועדף: ${c.preferredHeadCovering}`
//       : [
//           `רמת לימוד תורה: ${c.torahLearning}`,
//           `רישיון נהיגה: ${c.license ? 'כן' : 'לא'}`,
//           `זקן: ${c.beard ? 'כן' : 'לא'}`,
//           `סטטוס עישון: ${c.smokingStatus}`
//         ].join('\n'),
//     `מה הוא מחפש: ${c.descriptionFind}`,
//   ];

//   return lines.filter(Boolean).join('\n');
// };


// export const getMyCandidate = async (): Promise<CandidateDto> => {
//   const response = await axios.get<CandidateDto>('/api/HungarianAlgorithm/all', {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });
//   return response.data;
// };


const api = axios.create({
  baseURL: 'http://localhost:5245/api', // שימי לב שזה צריך להיות כתובת השרת האמיתי, לא פורט 3000!
  withCredentials: true // אם את משתמשת בעוגיות
});

// הוספת הטוקן לכל בקשה:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // או מאיפה ששומרת אותו
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
