// api/candidateApi.ts
import axios from 'axios';
import { Candidate } from '../types/candidate.types';

const BASE_URL = 'http://localhost:5245/api/Candidate';

export const getCandidates = async (): Promise<Candidate[]> => {
  const male = await getMaleCandidates();
  const female = await getFemaleCandidates();
  return [...male, ...female];
};


export const getCandidate = async (id: number): Promise<Candidate> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createCandidate = async (formData: FormData): Promise<Candidate> => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const updateCandidate = async (id: number, formData: FormData): Promise<void> => {
  const token = localStorage.getItem("token");
  console.log('token:', token)
  await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const deleteCandidate = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};


//שליפה של כל המועמדים
export const getMaleCandidates = async () => {
  const response = await axios.get<Candidate[]>(`${BASE_URL}/males`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

//שליפה של כל המועמדות
export const getFemaleCandidates = async () => {
  const response = await axios.get<Candidate[]>(`${BASE_URL}/females`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
