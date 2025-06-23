import { Candidate } from "../types/candidate.types";
import axios from 'axios';
const BASE_URL = 'http://localhost:5245/api';

const token = localStorage.getItem('token'); // או איך שאת שומרת אותו

interface MatchRequest {
  idCandidate1: number;
  idCandidate2: number;
}

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