// src/services/userService.ts
import axios from 'axios';
import { UserType } from '../types/user.types';

const API_URL = 'http://localhost:5245/api/user';

export const getAllUsers = async (): Promise<UserType[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUserById = async (id: number): Promise<UserType> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addUser = async (user: UserType): Promise<UserType> => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (id: number, user: UserType): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
