// src/services/userService.ts

import { UserType } from "../types/user.types";

const API_URL = "http://localhost:5245/api/user";

// קבלת כל המשתמשים
export const getAllUsers = async (): Promise<UserType[]> => {
  const res = await fetch(API_URL);
  return await res.json();
};

// קבלת משתמש לפי מזהה
export const getUserById = async (id: number): Promise<UserType> => {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
};

// הוספת משתמש חדש
export const addUser = async (user: UserType): Promise<UserType> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
};

// עדכון משתמש קיים
export const updateUser = async (id: number, user: UserType): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

// מחיקת משתמש
export const deleteUser = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
