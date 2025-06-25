// src/pages/UserPage.tsx

import React, { useState } from "react";
import UserForm from "../components/User/UserForm";
import UserList from "../components/User/UserList";
import { User } from "../types/user.types";

const UserPage = () => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setUserToEdit(user);
  };

  const handleFinish = () => {
    setUserToEdit(null);
  };

  return (
    <div>
      <h1>ניהול משתמשים</h1>
      <UserForm />
      <UserList onEdit={handleEdit} />
    </div>
  );
};

export default UserPage;
