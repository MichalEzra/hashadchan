// UserManagementPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchUsers } from '../../redux/thunks/users.thunks';
import styles from '../style/UserManagementPage.module.css'; // צור קובץ CSS Module תואם
import { User } from '../../types/user.types';

const UserManagementPage = () => {
  const dispatch = useAppDispatch();
  const { users = [], loading, error } = useAppSelector((state) => state.users) || {};

  useEffect(() => {
    // const userType = localStorage.getItem("userType");
    // if (userType === "ADMIN") {
      dispatch(fetchUsers());
    // }
  }, [dispatch]);

  if (loading) return <p className={styles.loading}>טוען נתונים...</p>;
  if (error) return <p className={styles.error}>שגיאה: {error}</p>;

  return (
    <div className={styles.page} dir="rtl">
      <h2 className={styles.title}>ניהול משתמשים</h2>

      {users.length === 0 && !loading && !error ? (
        <p className={styles.noUsers}>לא נמצאו משתמשים להצגה כרגע.</p>
      ) : (
        <div className={styles.grid}>
          {users.map((user: User) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
