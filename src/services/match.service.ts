import { CandidateDto, MatchResultsDto ,MatchRequest  } from "../types/candidateDto.types";
import axios from 'axios';
const BASE_URL = 'http://localhost:5245/api';

const token = localStorage.getItem('token'); // או איך שאת שומרת אותו

// יצירת שידוך בין מועמד למועמדת על ידי שדכן
export const createMatch = async (request: MatchRequest) => {
    console.log('token:', localStorage.getItem('token'));
  return await axios.post(
    `${BASE_URL}/Match`,request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// פונקציה לקבלת הצעות שידוכים לבנים
export const getMaleMatchProposals = async (): Promise<MatchResultsDto[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found.');
  }
  const response = await axios.get<MatchResultsDto[]>(
    `${BASE_URL}/HungarianAlgorithm/Get10Male`,
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
    `${BASE_URL}/HungarianAlgorithm/Get10Female`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
