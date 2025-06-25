// pages/EngagedPage.tsx
import React, { useEffect, useState } from 'react';
import { getEngagedMatches } from '../api/matches';
import EngagedMatchCard from '../components/matches/EngagedMatchCard';

const EngagedPage: React.FC = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await getEngagedMatches();
      setMatches(data);
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h1>מאורסים מהשבוע האחרון</h1>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {matches.map((m, i) => (
          <EngagedMatchCard key={i} match={m} />
        ))}
      </div>
    </div>
  );
};

export default EngagedPage;
