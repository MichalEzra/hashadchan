import React, { useState } from "react";
import { Matchmaker } from "../../types/matchmaker.types";
import { createMatchmaker, updateMatchmaker } from "../../services/matchmaker.service";

interface Props {
  matchmaker?: Matchmaker;
  onClose: () => void;
  onSaved: () => void;
}

const MatchmakerForm: React.FC<Props> = ({ matchmaker, onClose, onSaved }) => {
  const [formData, setFormData] = useState<Matchmaker>(
    matchmaker || {
      id: 0,
      userId: 0,
      user: {} as any,
      firstName: "",
      lastName: "",
      birthDate: "",
      matchmakerGender: "",
      identityNumber: "",
      marriageDate: "",
      country: "",
      city: "",
      matchmakerSector: "",
      subSector: "",
      yearsOfExperience: 0,
      matchesClosed: 0,
      languages: "",
      religiousOpenness: "",
      phoneNumber: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (matchmaker) {
      await updateMatchmaker(matchmaker.id, formData);
    } else {
      await createMatchmaker(formData);
    }
    onSaved();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-xl shadow-md bg-white space-y-4">
      <h2 className="text-xl font-semibold">{matchmaker ? "עריכת שדכן" : "הוספת שדכן"}</h2>

      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="שם פרטי"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="שם משפחה"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="עיר"
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="טלפון"
        className="border p-2 w-full rounded"
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          שמור
        </button>
        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
          בטל
        </button>
      </div>
    </form>
  );
};

export default MatchmakerForm;
