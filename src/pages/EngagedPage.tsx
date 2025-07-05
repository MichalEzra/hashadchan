// pages/EngagedPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchEngagedMatches } from '../redux/slice/matchSlice';
import EngagedMatchCard from '../components/matches/EngagedMatchCard';
import styles from '../components/design/EngagedMatchCard.module.css'

const EngagedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { engagedMatches, loading, error } = useAppSelector((state) => state.matches);

  useEffect(() => {
    dispatch(fetchEngagedMatches());
  }, [dispatch]);

  if (loading) return <p>טוען...</p>;
  if (error) return <p>שגיאה: {error}</p>;

  return (
    <div>
      <h1>מאורסים מהשבוע האחרון</h1>
      <div className={styles.container}>
        {engagedMatches.map((m) => (
  <EngagedMatchCard key={m.matchId} match={m} />
))}

      </div>
    </div>
  );
};

export default EngagedPage;
