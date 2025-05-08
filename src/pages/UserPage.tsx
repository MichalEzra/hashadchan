// src/pages/UserPage.tsx

import React, { useState } from "react";
import UserForm from "../components/User/UserForm";
import UserList from "../components/User/UserList";
import { UserType } from "../types/user.types";

const UserPage = () => {
  const [userToEdit, setUserToEdit] = useState<UserType | null>(null);

  const handleEdit = (user: UserType) => {
    setUserToEdit(user);
  };

  const handleFinish = () => {
    setUserToEdit(null);
  };

  return (
    <div>
      <h1>ניהול משתמשים</h1>
      <UserForm userToEdit={userToEdit} onFinish={handleFinish} />
      <UserList onEdit={handleEdit} />
    </div>
  );
};

export default UserPage;
