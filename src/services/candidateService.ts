// api/candidateApi.ts
import axios from 'axios';
import { Candidate } from '../types/candidate.types';

const BASE_URL = 'http://localhost:5245/api/Candidate';

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
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


export const updateCandidate = async (id: number, candidate: Candidate): Promise<void> => {
  await axios.put(`${BASE_URL}/${id}`, candidate);
};

export const deleteCandidate = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
