// MatchmakerApprovalPanel.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Matchmaker {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  isApproved: boolean;
}

export const MatchmakerApprovalPanel: React.FC = () => {
  const [matchmakers, setMatchmakers] = useState<Matchmaker[]>([]);

  useEffect(() => {
    axios.get('/api/user/matchmakers?approved=false')
      .then(res => setMatchmakers(res.data))
      .catch(err => console.error(err));
  }, []);

  const approveMatchmaker = async (email: string) => {
    try {
      await axios.post(`/api/user/approve?email=${encodeURIComponent(email)}`);
      alert('שדכן אושר בהצלחה');
      setMatchmakers(prev => prev.filter(m => m.email !== email));
    } catch (error) {
      alert('שגיאה באישור שדכן');
    }
  };

  return (
    <div>
      <h2>בקשות לאישור שדכנים</h2>
      <ul>
        {matchmakers.map(m => (
          <li key={m.id}>
            {m.fullName} ({m.email}) - {m.phoneNumber}
            <button onClick={() => approveMatchmaker(m.email)}>אשר שדכן</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
