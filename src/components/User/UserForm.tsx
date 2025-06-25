import React, { useState } from "react";
import { addUser } from "../../services/user.service";

type UserType = "ADMIN" | "MATCHMAKER" | "PARENT";

interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  userType: UserType;
}

const UserForm = () => {
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "PARENT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const user = await addUser( data as any)
    console.log(user);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>שם מלא:</label>
        <input name="fullName" value={user.fullName} onChange={handleChange} />
      </div>
      <div>
        <label>אימייל:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </div>
      <div>
        <label>סיסמה:</label>
        <input type="password" name="password" value={user.password} onChange={handleChange} />
      </div>
      <div>
        <label>טלפון:</label>
        <input name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label>סוג משתמש:</label>
        <select name="userType" value={user.userType} onChange={handleChange}>
          <option value="0">ADMIN</option>
          <option value="1">MATCHMAKER</option>
          <option value="2">PARENT</option>
        </select>
      </div>

      <button type="submit">שמור</button>
    </form>
  );
};

export default UserForm;