import React, { useState } from "react";
import {
  Gender,
  CandidateStatus,
  Sector,
  SubSector,
  TorahStudy,
  EducationInstitution,
  Occupation,
  Language,
  Openness,
  HeadCovering,
  PhoneType,
  ParentsStatus,
  Smoking,
  Physique,
  SkinTone,
  HairColor,
  ClothingStyle,
} from "../../types/enums";
import { Candidate } from "../../types/candidate.types";
import { createCandidate } from "../../services/candidateService";

const CandidateForm: React.FC = () => {
  const [candidate, setCandidate] = useState<Partial<Candidate>>({
    firstName: "",
    lastName: "",
    candidateGender: Gender.MALE,
    status: CandidateStatus.SINGLE,
    // age: 18,
    candidateSector: Sector.HASIDI,
    subSector: SubSector.YESHIVISH,
    torahLearning: TorahStudy.FULL_TIME,
    education: EducationInstitution.HIGH_SCHOOL,
    jobOrStudies: Occupation.STUDENT,
    city: "",
    origin: "",
    languages: Language.HEBREW,
    religiousOpenness: Openness.TRADITIONAL,
    clothingStyle: ClothingStyle.MODERN,
    // height: 170,
    physique: Physique.AVERAGE,
    skinTone: SkinTone.FAIR,
    hairColor: HairColor.BROWN,
    giving: 0,
    expecting: 0,
    familyStatus: ParentsStatus.MARRIED,
    availableForProposals: true,
    preferredHeadCovering: HeadCovering.FLEXIBLE,
    candidatePhoneType: PhoneType.SMARTPHONE,
    beard: false,
    smokingStatus: Smoking.NON_SMOKER,
    license: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

// const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//   const { name, value, type } = e.target;
//   const isCheckbox = type === "checkbox";

//   setCandidate((prev) => ({
//     ...prev,
//     [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
//   }));
// };


// לטיפול ב- input כולל טקסט, מספר, צ'קבוקס
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, type, value, checked } = e.target;
  setCandidate((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : type === "number" || type === "range" ? Number(value) : value,
  }));
};


// לטיפול בבחירה מ- select
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setCandidate((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      setError("נא לבחור קובץ תמונה חוקי");
      setImageFile(null);
    } else {
      setError(null);
      setImageFile(file || null);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (file && !allowedTypes.includes(file.type)) {
      setError("נא להעלות קובץ רזומה בפורמט PDF או Word בלבד");
      setResumeFile(null);
    } else {
      setError(null);
      setResumeFile(file || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(candidate).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    if (imageFile) formData.append("imageFile", imageFile);
    if (resumeFile) formData.append("resumeFile", resumeFile);

    try {
      setError(null);
      await createCandidate(formData);
      alert("מועמד נוסף בהצלחה!");
      setCandidate({});
      setImageFile(null);
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      setError("שגיאה ביצירת מועמד, נסי שוב מאוחר יותר");
    }
  };
return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>שם פרטי:</label>
        <input name="firstName" value={candidate.firstName || ""} onChange={handleInputChange} required />
      </div>

      <div>
        <label>שם משפחה:</label>
        <input name="lastName" value={candidate.lastName || ""} onChange={handleInputChange} required />
      </div>

      <div>
        <label>מגדר:</label>
        <select name="candidateGender" value={candidate.candidateGender || Gender.MALE} onChange={handleSelectChange}>
          {Object.entries(Gender).map(([key, val]) => (
            <option key={key} value={val}>{val}</option>
          ))}
        </select>
      </div>

      <div>
        <label>סטטוס:</label>
        <select name="status" value={candidate.status || CandidateStatus.SINGLE} onChange={handleSelectChange}>
          {Object.entries(CandidateStatus).map(([key, val]) => (
            <option key={key} value={val}>{val}</option>
          ))}
        </select>
      </div>

      <div>
        <label>גיל:</label>
        <input type="number" name="age" value={candidate.age || ""} onChange={handleInputChange} required min={18} />
      </div>

    <div>
        <label >גובה:</label>
<label htmlFor="height">גובה (בס"מ): {candidate.height ?? ""}</label>
<label htmlFor="height">גובה (בס"מ): {candidate.height}</label>
<input
  type="range"
  id="height"
  name="height"
  min="140"
  max="220"
  step="1"
  value={candidate.height}
  onChange={handleInputChange}
/>
   </div>
      <div>
        <label>מגזר:</label>
        <select name="candidateSector" value={candidate.candidateSector || Sector.HASIDI} onChange={handleSelectChange}>
          {Object.entries(Sector).map(([key, val]) => (
            <option key={key} value={val}>{val}</option>
          ))}
        </select>
      </div>

      <div>
        <label>תת מגזר:</label>
        <select name="subSector" value={candidate.subSector || SubSector.YESHIVISH} onChange={handleSelectChange}>
          {Object.entries(SubSector).map(([key, val]) => (
            <option key={key} value={val}>{val}</option>
          ))}
        </select>
      </div>

      <div>
        <label>תמונה:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div>
        <label>רזומה (PDF או Word):</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
      </div>


{/* עיר */}
<div>
  <label>עיר:</label>
  <input name="city" value={candidate.city || ""} onChange={handleInputChange} />
</div>

{/* מוצא */}
<div>
  <label>מוצא:</label>
  <input name="origin" value={candidate.origin || ""} onChange={handleInputChange} />
</div>

{/* שפות */}
<div>
  <label>שפות:</label>
  <select name="languages" value={candidate.languages || Language.HEBREW} onChange={handleSelectChange}>
    {Object.entries(Language).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* פתיחות דתית */}
<div>
  <label>פתיחות דתית:</label>
  <select name="religiousOpenness" value={candidate.religiousOpenness || Openness.TRADITIONAL} onChange={handleSelectChange}>
    {Object.entries(Openness).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* סגנון לבוש */}
<div>
  <label>סגנון לבוש:</label>
  <select name="clothingStyle" value={candidate.clothingStyle || ClothingStyle.MODERN} onChange={handleSelectChange}>
    {Object.entries(ClothingStyle).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* מבנה גוף */}
<div>
  <label>מבנה גוף:</label>
  <select name="physique" value={candidate.physique || Physique.AVERAGE} onChange={handleSelectChange}>
    {Object.entries(Physique).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* גוון עור */}
<div>
  <label>גוון עור:</label>
  <select name="skinTone" value={candidate.skinTone || SkinTone.FAIR} onChange={handleSelectChange}>
    {Object.entries(SkinTone).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* צבע שיער */}
<div>
  <label>צבע שיער:</label>
  <select name="hairColor" value={candidate.hairColor || HairColor.BROWN} onChange={handleSelectChange}>
    {Object.entries(HairColor).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* נתינה */}
<div>
  <label htmlFor="giving">רמת נתינה: {candidate.giving ?? "בחרי רמה (0–10)"}</label>
  <input
    type="range"
    id="giving"
    name="giving"
    min={100000}
    max={1000000}
    step={10000}
    value={candidate.giving ??0 }
    onChange={handleInputChange}
  />
</div>

{/* ציפיות */}
<div>
  <label htmlFor="expecting">רמת ציפיות: {candidate.expecting ?? "בחרי רמה (0–10)"}</label>
  <input
    type="range"
    id="expecting"
    name="expecting"
    min={100000}
    max={1000000}
    step={10000}
    value={candidate.expecting ??0}
    onChange={handleInputChange}
  />
</div>
{/* מצב משפחתי של ההורים */}
<div>
  <label>מצב משפחתי של ההורים:</label>
  <select name="familyStatus" value={candidate.familyStatus || ParentsStatus.MARRIED} onChange={handleSelectChange}>
    {Object.entries(ParentsStatus).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* פתוח להצעות */}
<div>
  <label>פתוח להצעות:</label>
  <input type="checkbox" name="availableForProposals" checked={candidate.availableForProposals ?? false} onChange={handleInputChange} />
</div>

{/* סוג כיסוי ראש מועדף */}
<div>
  <label>כיסוי ראש מועדף:</label>
  <select name="preferredHeadCovering" value={candidate.preferredHeadCovering || HeadCovering.FLEXIBLE} onChange={handleSelectChange}>
    {Object.entries(HeadCovering).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* סוג פלאפון */}
<div>
  <label>סוג פלאפון:</label>
  <select name="candidatePhoneType" value={candidate.candidatePhoneType || PhoneType.SMARTPHONE} onChange={handleSelectChange}>
    {Object.entries(PhoneType).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* זקן */}
<div>
  <label>זקן:</label>
  <input type="checkbox" name="beard" checked={candidate.beard ?? false} onChange={handleInputChange} />
</div>

{/* מעשן */}
<div>
  <label>סטטוס עישון:</label>
  <select name="smokingStatus" value={candidate.smokingStatus || Smoking.NON_SMOKER} onChange={handleSelectChange}>
    {Object.entries(Smoking).map(([key, val]) => (
      <option key={key} value={val}>{val}</option>
    ))}
  </select>
</div>

{/* רישיון נהיגה */}
<div>
  <label>רישיון נהיגה:</label>
  <input type="checkbox" name="license" checked={candidate.license ?? false} onChange={handleInputChange} />
</div>



      <button type="submit">הוסף מועמד</button>
    </form>
  );
};

export default CandidateForm;
