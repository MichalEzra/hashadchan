import axios from 'axios';
import { Matchmaker } from '../types/matchmaker.types'; // אם זה לא שם, תעדכני לפי המיקום הנכון

const BASE_URL = 'http://localhost:5245/api/Matchmaker';

// שליפת כל השדכנים
export const getAllMatchmakers = async (): Promise<Matchmaker[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// שליפת שדכן לפי מזהה
export const getMatchmakerById = async (id: number): Promise<Matchmaker> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// יצירת שדכן חדש
export const createMatchmaker = async (formDate: FormData): Promise<Matchmaker> => {
  const response = await axios.post(BASE_URL, formDate);
  return response.data;
};

// עדכון שדכן קיים
export const updateMatchmaker = async (id: number, formData: FormData): Promise<void> => {
  await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: {    
      "Content-Type": "multipart/form-data",
    },
  });
};

// מחיקת שדכן
export const deleteMatchmaker = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
