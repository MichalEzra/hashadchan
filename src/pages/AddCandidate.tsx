import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import CandidateForm from "../components/forms/CandidateForm";
import { UserType } from "../types/enums";

const AddCandidate: React.FC = () => {
  const userType = useAppSelector((state) => state.auth.user?.userType);

  if (userType !== UserType.PARENT) {
    return <p>רק משתמש מסוג הורה יכול להוסיף מועמד.</p>;
  }

  return (
    <div>
      <h1>הוספת מועמד</h1>
      <CandidateForm />
    </div>
  );
};

export default AddCandidate;
