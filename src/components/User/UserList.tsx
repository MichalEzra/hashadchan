import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/user.service";
import { User } from "../../types/user.types";

interface UserListProps {
  onEdit: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onEdit }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("את בטוחה שתרצי למחוק?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>אימייל</th>
          <th>סוג משתמש</th>
          <th>שם מלא</th>
          <th>טלפון</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.userType}</td>
            <td>{user.fullName}</td>
            <td>{user.phoneNumber || "-"}</td>
            <td>
              <button onClick={() => onEdit(user)}>✏️</button>
              {user.id !== undefined && (
                  <button onClick={() => handleDelete(user.id!)}>🗑️</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;