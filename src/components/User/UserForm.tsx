import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../../services/userService";
import { UserType } from "../../types/user.types";  // ייבוא המודל

const initialState = {
  email: "",
  password: "",
  userType: "PARENT",
  contactPersonFirstName: "",
  contactPersonLastName: "",
  contactPersonPhone: "",
};

const UserForm = ({ userToEdit, updateUser, addUser }: any) => {
    const [user, setUser] = useState<UserType>({
      id: 0,  // התחלת ערך לאפס במקרה שאין id בהתחלה
      email: "",
      password: "",
      userType: "",
      contactPersonFirstName: "",
      contactPersonLastName: "",
      contactPersonPhone: "",
    });
  
    useEffect(() => {
      if (userToEdit) {
        setUser(userToEdit);  // אם יש userToEdit, אתמלא את המידע
      }
    }, [userToEdit]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (user.id) {  // אם יש id, אנחנו מעדכנים את המשתמש
        await updateUser(user.id, user);
      } else {  // אחרת אנחנו מוסיפים משתמש חדש
        await addUser(user);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {/* טפסים ושדות */}
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {/* הוספת שדות נוספים */}
        <button type="submit">שמור</button>
      </form>
    );
  };
  
  export default UserForm;