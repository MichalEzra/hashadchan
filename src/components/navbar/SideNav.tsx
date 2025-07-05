import React, { useState } from 'react';
import styles from './sideNav.module.css';
import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router';

interface SideNavProps {
    onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ onClose }) => {

    const navigate = useNavigate()
    const userType = useAppSelector(state => state.auth.user?.userType);

    const renderButtons = () => {
        switch (userType) {
            case 'ADMIN':
                return (
                    <>
                        <button className={styles.adminButton} onClick={() => navigate('/users')}>ניהול משתמשים</button>
                        <button className={styles.adminButton} onClick={() => navigate('/candidates')}>ניהול מועמדים</button>
                        <button className={styles.adminButton} onClick={() => navigate('/matchmakers')}>ניהול שדכנים</button>
                    </>
                );
            case 'MATCHMAKER':
                return (
                    <>
                        <button className={styles.adminButton} onClick={() => navigate('/candidates')}>ניהול מועמדים</button>
                        <button className={styles.adminButton} onClick={() => navigate('/match')}>התאמת מועמדים</button>

                    </>
                );
            case 'PARENT':
                return (
                    <>
                        <button className={styles.adminButton} onClick={() => navigate('/candidates/new')}>הוספת מועמד</button>
                        <button className={styles.adminButton} onClick={() => navigate('/candidates')}>צפייה בפרטי המועמדים</button>
                        <button className={styles.adminButton} onClick={() => navigate('/algorithm-match')}>הסטוריית שידוכים</button>
                    </>
                );
            default:
                return <p>אין הרשאות זמינות</p>;
        }
    };

    return (
        <div className={styles.sideNav}>
            {renderButtons()}
        </div>
    );
};

export default SideNav;
