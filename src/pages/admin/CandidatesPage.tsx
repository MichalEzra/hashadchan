// src/pages/CandidateManagementPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCandidates } from '../../redux/thunks/candidates.thunks';
import CandidateForm from '../../components/candidate/CandidateForm';

const CandidateManagementPage = () => {
  const dispatch = useAppDispatch();
  const candidates = useAppSelector((state) => state.candidates.candidates);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ניהול מועמדים</h2>
      <CandidateForm />
      <div className="mt-6">
        {candidates.map((c) => (
          <div key={c.id} className="p-2 border mb-2 rounded">
            {c.firstName} {c.lastName} - {c.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateManagementPage;
