// src/services/userService.ts
import axios from 'axios';
import { User } from '../types/user.types';
import {register} from './auth.service'; // Assuming you have a signup function in auth.service
import { CandidateDto } from '../types/candidateDto.types';

const API_URL = 'http://localhost:5245/api/user';
export type NewUser = Omit<User, 'id' | 'candidate'>;

// export const addUser = async (user: User): Promise<User> => {
//   console.log('קיבלתי בקשה')
//   const token = localStorage.getItem("token");
//   const response = await axios.post(API_URL, user, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

type RegisterResponse = User | { message: string };

export const addUser = async (user: User): Promise<RegisterResponse> => {
  console.log('📩 שולח בקשה להרשמה דרך Signup');
  const createdUser = await register(user);
  return createdUser;
};



export const getAllUsers = async (): Promise<User[]> => {
  console.log('קיבלתי בקשה')
  const token = localStorage.getItem("token");
  if (!token) {
  console.error("❌ אין טוקן ב־localStorage",token);
}
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (id: number, user: User): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.put(`${API_URL}/${id}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};


export const deleteUser = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCandidatesByUserId = async (userId: number): Promise<CandidateDto[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`/api/users/${userId}/candidates`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMyCandidate = async (): Promise<CandidateDto> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found');

  const response = await axios.get<CandidateDto>(
    `${API_URL}/Candidate/User`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
