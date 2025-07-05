import React from 'react';
import styles from '../design/EngagedMatchCard.module.css';

interface EngagedMatch {
  nameGuy: string;
  nameGirl: string;
  dateMatch: string;
  yeshivaGuy: string;
  seminaryGirl: string;
  cityGuy: string;
  cityGirl: string;
}

const EngagedMatchCard: React.FC<{ match: EngagedMatch }> = ({ match }) => {
  const formattedDate = new Date(match.dateMatch).toLocaleDateString('he-IL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.card}>
      <div className={styles.names}>
        <div className={styles.girl}>
          <strong>{match.nameGirl}</strong><br />
          {match.seminaryGirl}<br />
          {match.cityGirl}
        </div>
        <div className={styles.guy}>
          <strong>{match.nameGuy}</strong><br />
          {match.yeshivaGuy}<br />
          {match.cityGuy}
        </div>
      </div>
      <div className={styles.engagedLabel}>
        💍 מאורסים
      </div>
      <div className={styles.date}>
        אור ל־{formattedDate}
      </div>
    </div>
  );
};

export default EngagedMatchCard;
