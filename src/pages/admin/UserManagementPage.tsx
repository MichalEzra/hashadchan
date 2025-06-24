import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchUsers } from '../../redux/thunks/users.thunks';
import styles from '../style/UserManagementPage.module.css';
import { User } from '../../types/user.types';
import { Pencil, Trash } from 'lucide-react';
import { deleteUser, updateUser } from '../../services/user.service';

const UserManagementPage = () => {
  const dispatch = useAppDispatch();
  const { users = [], loading, error } = useAppSelector((state) => state.users) || {};
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((u: User) =>
    u.fullName.toLowerCase().includes(search.toLowerCase())
  );

  
    const handleDelete = async (id: number) => {
      const confirmDelete = window.confirm('האם את בטוחה שברצונך למחוק את המועמד?');
      if (confirmDelete) {
        await deleteUser(id);
        dispatch(fetchUsers());
      }
    };

    const handleEditClick = (user: User) => {
  setSelectedUser(user);
  setShowModal(true);
};

  
  
      const handleSaveEdit = async () => {
        if (!selectedUser || !selectedUser.id) return;
        try {
          await updateUser(selectedUser.id, selectedUser); // שולח את המשתמש המעודכן
          alert("המשתמש עודכן בהצלחה!");
          dispatch(fetchUsers()); // מרענן את הרשימה
          setShowModal(false);    // סוגר את החלונית
        } catch (error) {
          console.error("שגיאה בעדכון המשתמש:", error);
          alert("אירעה שגיאה בעת עדכון המשתמש. נסה שוב.");
        }
      };

  if (loading) return <p className={styles.loading}>טוען נתונים...</p>;
  if (error) return <p className={styles.error}>שגיאה: {error}</p>;

  return (
    <div className={styles.page} dir="rtl">
      <h2 className={styles.title}>ניהול משתמשים</h2>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="חיפוש לפי שם..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 && !loading && !error ? (
        <p className={styles.noUsers}>לא נמצאו משתמשים להצגה כרגע.</p>
      ) : (
        <div className={styles.grid}>
          {filteredUsers.map((user: User) => (
            <div key={user.id} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.avatarPlaceholder}>
                  {user.fullName ? user.fullName[0] : ''}
                </div>
                <div className={styles.nameType}>
                  <h3 className={styles.name}>{user.fullName}</h3>
                  <p className={styles.type}>{user.userType}</p>
                </div>
              </div>

              <ul className={styles.details}>
                <li><strong>אימייל:</strong> {user.email}</li>
                <li><strong>טלפון:</strong> {user.phoneNumber || 'לא צויין'}</li>
                <li><strong>סוג משתמש:</strong> {user.userType}</li>
                {user.candidate && (
                  <li><strong>מועמד מקושר:</strong> {user.candidate.firstName} {user.candidate.lastName}</li>
                )}
              </ul>

              <div className={styles.actions}>
                <button onClick={() => handleEditClick(user)} className={styles.editBtn}>
                  <Pencil size={16} /> עריכה
                </button>
                <button onClick={() => handleDelete(user.id!)} className={styles.deleteBtn}>
                  <Trash size={16} /> מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>עריכת משתמש</h3>
            <label>
              שם מלא:
              <input
                value={selectedUser.fullName}
                onChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
              />
            </label>
            <label>
              אימייל:
              <input
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </label>
            <label>
              טלפון:
              <input
                value={selectedUser.phoneNumber || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
              />
            </label>
            {/* <label>
              סוג משתמש:
              <select
                value={selectedUser.userType}
                onChange={(e) => setSelectedUser({ ...selectedUser, userType: e.target.value as User['userType'] })}
              >
                <option value="ADMIN">מנהל</option>
                <option value="PARENT">הורה</option>
                <option value="MATCHMAKER">שדכן</option>
              </select>
            </label> */}

            <div className={styles.modalActions}>
              <button onClick={() =>  handleSaveEdit()}>שמור</button>

              <button onClick={() => setShowModal(false)}>ביטול</button>
            </div>
          </div>
        </div>
)}

    </div>
    
  );
};

export default UserManagementPage;

