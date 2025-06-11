// src/services/userService.ts
import axios from 'axios';
import { User } from '../types/user.types';

const API_URL = 'http://localhost:5245/api/user';
export type NewUser = Omit<User, 'id' | 'candidate'>;

export const addUser = async (user: NewUser): Promise<User> => {
  console.log('קיבלתי בקשה')
  const response = await axios.post(API_URL, user);
  return response.data;
};


export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id: number, user: User): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
