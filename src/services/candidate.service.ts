// services/candidate.service.ts
import axios from 'axios';
import { Candidate } from '../types/candidate.types';
import axiosInstance from './axiosInstance';

const BASE_URL = 'http://localhost:5245/api/Candidate';

// שליפת מועמדים לפי מגדר
export const getMaleCandidates = async (): Promise<Candidate[]> => {
  const response = await axios.get(`${BASE_URL}/males`);
  return response.data;
};

export const getFemaleCandidates = async (): Promise<Candidate[]> => {
  const response = await axios.get(`${BASE_URL}/females`);
  return response.data;
};

// שליפת כל המועמדים (גברים + נשים)
export const getCandidates = async (): Promise<Candidate[]> => {
  const male = await getMaleCandidates();
  const female = await getFemaleCandidates();
  return [...male, ...female];
};

// שליפת מועמד בודד
export const getCandidate = async (id: number): Promise<Candidate> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// יצירת מועמד חדש
export const createCandidate = async (formData: FormData): Promise<Candidate> => {
  const token = localStorage.getItem("token"); // ← שליפת הטוקן
  const response = await axiosInstance.post(BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}` // ← שליחה לשרת
    },
  });
  return response.data;
};


// עדכון מועמד
export const updateCandidate = async (id: number, formData: FormData): Promise<Candidate> => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// מחיקת מועמד
export const deleteCandidate = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
