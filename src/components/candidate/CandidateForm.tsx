import React, { useEffect, useState } from "react";
import {
  Gender,
  Status,
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
import {createCandidate,  getCandidate,  updateCandidate,} from "../../services/candidate.service";
import styles from "../design/CandidateForm.module.css";
import { useParams } from "react-router-dom";
interface ColorCircleSelectorProps {
  name: string;
  selected: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; hex: string }[];
  labelText: string;
  dotColor?: 'green' | 'purple' | 'blue';
}

const ColorCircleSelector: React.FC<ColorCircleSelectorProps> = ({
  name,
  selected,
  onChange,
  options,
  labelText,
  dotColor = 'green',
}) => {
  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={`${styles.dot} ${styles[dotColor + 'Dot']}`}></span>
        {labelText}
      </label>
      <div className={styles.colorCircleContainer}>
        {options.map((opt) => (
          <div
            key={opt.value}
            title={opt.label}
            onClick={() => onChange(opt.value)}
            className={styles.colorCircle}
            style={{
              backgroundColor: opt.hex,
              border: selected === opt.value ? '3px solid black' : '1px solid #ccc',
            }}
          />
        ))}
      </div>
    </div>
  );
};
const hairColorOptions = [
  { value: 'BROWN', label: HairColor.BROWN, hex: '#6B4423' },
  { value: 'BLACK', label: HairColor.BLACK, hex: ' #000000' },
  { value: 'DIRTY_BLONDE', label: HairColor.DIRTY_BLONDE, hex: 'rgb(230, 175, 81)' },
  { value: 'BLONDE', label: HairColor.BLONDE, hex: 'rgb(250, 235, 104)' },
  { value: 'REDHEAD', label: HairColor.REDHEAD, hex: 'rgb(254, 160, 45)' },
];

const skinToneOptions = [
  { value: 'FAIR', label: SkinTone.FAIR, hex: 'rgb(255, 220, 202) ' },
  { value: 'FAIR_TO_MEDIUM', label: SkinTone.FAIR_TO_MEDIUM, hex: 'rgb(255, 218, 175) ' },
  { value: 'TAN', label: SkinTone.TAN, hex: 'rgb(230, 189, 157)' },
  { value: 'MEDIUM_TO_DARK', label: SkinTone.MEDIUM_TO_DARK, hex: 'rgb(212, 167, 138)' },
  { value: 'DARK', label: SkinTone.DARK, hex: 'rgb(182, 127, 91)' },
];


interface HeightSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const HeightSlider: React.FC<HeightSliderProps> = ({
      value,
      onChange,
      min = 140,
      max = 220,
      step = 1,
        }) => {
          const ticks = [];
          for (let i = min; i <= max; i += 5) {
            ticks.push(i);
          }

  return (
    <div className={styles.container}>
      <label className={styles.heightLabel}>
        גובה: <span className={styles.value}>{(value / 100).toFixed(2)} מ'</span> ({value} ס"מ)
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.ticks}>
        {ticks.map((tick) => (
          <span
            key={tick}
            className={styles.tick}
            style={{ left: `${((tick - min) / (max - min)) * 100}%` }}
          >
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
};

const CandidateForm: React.FC = () => {
  const { id } = useParams();

  const initialCandidate: any = {
    firstName: "",
    lastName: "",
    gender: "",
    status: "",
    age: 18,
    sector: "",
    subSector: "",
    torahLearning: "",
    education: "",
    occupation: "",
    city: "",
    origin: "",
    languages: "",
    openness: "",
    clothingStyle: "",
    height: 140,
    physique: "",
    skinTone: "",
    hairColor: "",
    giving: 0,
    expecting: 0,
    familyStatus: "",
    availableForProposals: false,
    headCovering: "",
    phoneType: "",
    beard: false,
    smokingStatus: "",
    license: false,
    descriptionSelf: "",
    descriptionFind: "",
  };

  const [candidate, setCandidate] = useState(initialCandidate);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getCandidate(Number(id)).then((data) => {
        setCandidate(data);
      });
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setCandidate((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, options, multiple } = e.target;
    if (multiple) {
      const selected = Array.from(options).filter((o) => o.selected).map((o) => o.value);
      setCandidate((prev: any) => ({ ...prev, [name]: selected }));
    } else {
      setCandidate((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      setError("נא לבחור קובץ תמונה חוקי");
      return;
    }
    setImageFile(file || null);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (file && !allowedTypes.includes(file.type)) {
      setError("נא להעלות קובץ רזומה חוקי (PDF או Word)");
      return;
    }
    setResumeFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(candidate).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    if (imageFile) formData.append("fileImage", imageFile);
    if (resumeFile) formData.append("rezumehFile", resumeFile);
    console.log("Form data being sent:", Object.fromEntries(formData.entries()));
    try {
      if (id) {
        await updateCandidate(Number(id), formData);
        alert("המועמד עודכן בהצלחה");
      } else {
        await createCandidate(formData);
        alert("מועמד נוסף בהצלחה");
      }
    } catch {
      setError("שגיאה בשליחה");
    }
  };

  // const renderSelectWithPlaceholder = (
  //   name: string,
  //   value: any,
  //   options: any,
  //   multiple = false,
  //   labelText: string
  // ) => (
  //   <label className={styles.fieldWrapper}>
  //     <span className={styles.label}>{labelText}</span>
  //     <select
  //       name={name}
  //       value={value}
  //       onChange={handleSelectChange}
  //       multiple={multiple}
  //       className={styles.select}
  //     >
  //       {!multiple && <option value="" disabled>בחר/י</option>}
  //       {Object.entries(options).map(([key, val]) => (
  //         <option key={key} value={key}>
  //           {String(val)}
  //         </option>
  //       ))}
  //     </select>
  //   </label>
  // );


   const renderSelectWithPlaceholder = (
    name: string,
    value: any,
    options: any,
    multiple = false,
    labelText: string,
    dotColor: 'green' | 'purple' | 'blue' = 'green'
  ) => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={`${styles.dot} ${styles[dotColor + 'Dot']}`}></span>
        {labelText}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleSelectChange}
        multiple={multiple}
        className={styles.select}
      >
        {!multiple && <option value="" disabled>בחר/י</option>}
        {Object.entries(options).map(([key, val]) => (
          <option key={key} value={key}>
            {String(val)}
          </option>
        ))}
      </select>
    </div>
  );

  const renderInputField = (
    name: string,
    value: any,
    labelText: string,
    type = "text",
    dotColor: 'green' | 'purple' | 'blue' = 'green'
  ) => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={`${styles.dot} ${styles[dotColor + 'Dot']}`}></span>
        {labelText}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  );

  const renderTextareaField = (
    name: string,
    value: any,
    labelText: string,
    dotColor: 'green' | 'purple' | 'blue' = 'green'
  ) => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={`${styles.dot} ${styles[dotColor + 'Dot']}`}></span>
        {labelText}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={handleInputChange}
        className={styles.textarea}
      />
    </div>
  );

  const renderCheckboxField = (
    name: string,
    checked: boolean,
    labelText: string
  ) => (
    <div className={styles.checkboxGroup}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleInputChange}
          className={styles.checkbox}
        />
        <span className={styles.checkboxText}>{labelText}</span>
      </label>
    </div>
  );

  const renderRangeSlider = (
    name: string,
    value: number,
    labelText: string,
    min: number,
    max: number,
    step: number,
    dotColor: 'green' | 'purple' | 'blue' = 'green'
  ) => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={`${styles.dot} ${styles[dotColor + 'Dot']}`}></span>
        {labelText}
        <span className={styles.rangeValue}>{value.toLocaleString()}</span>
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInputChange}
        className={styles.rangeSlider}
      />
      <div className={styles.rangeTicks}>
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );

  const renderGenderButtons = () => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={styles.greenDot}></span>
        מגדר *
      </label>
      <div className={styles.genderButtons}>
        <button
          type="button"
          className={`${styles.genderButton} ${candidate.gender === 'FEMALE' ? styles.active : ''}`}
          onClick={() => setCandidate((prev : typeof candidate) => ({...prev, gender: 'FEMALE'}))}
        >
          <div className={styles.genderIcon}>👤</div>
          אישה
        </button>
        <button
          type="button"
          className={`${styles.genderButton} ${candidate.gender === 'MALE' ? styles.active : ''}`}
          onClick={() => setCandidate((prev : typeof candidate) => ({...prev, gender: 'MALE'}))}
        >
          <div className={styles.genderIcon}>👤</div>
          גבר
        </button>
      </div>
    </div>
  );

  const renderFileUpload = (
    name: string,
    file: File | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    labelText: string,
    accept: string,
    dotColor: 'green' | 'purple' | 'blue' = 'green'
  ) => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={`${styles.dot} ${styles[dotColor + 'Dot']}`}></span>
        {labelText}
      </label>
      <div className={styles.fileUpload}>
        <div className={styles.fileUploadBox}>
          <div className={styles.fileUploadIcon}>+</div>
          <div className={styles.fileUploadText}>
            {file ? file.name : `קובץ ${labelText.toLowerCase()}`}
          </div>
        </div>
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className={styles.fileInput}
        />
      </div>
      <div className={styles.fileHint}>
        הקובץ יכול להיות בפורמטים {accept.replace(/\./g, '').toUpperCase()} עד למשקל 7MB
      </div>
    </div>
  );


  return (
        <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <div className={styles.avatarPlaceholder}>👤</div>
          </div>
          <div className={styles.profileInfo}>
            <h2> פרופיל</h2>
            {/* <p>מתור מאגר איכותיי</p> */}
          </div>
        </div>
        <div className={styles.formTitle}>פרטי מועמד</div>
      </div>

    <form onSubmit={handleSubmit} className={styles.form} dir="rtl">

           {/* שורה ראשונה */}
          <div className={styles.row}>
            {renderInputField("firstName", candidate.firstName, "שם פרטי *", "text", "purple")}
           {renderInputField("lastName", candidate.lastName, "שם משפחה", "text", "green")}
        </div>

           {/* שורה שנייה */}
          <div className={styles.row}>
          {renderGenderButtons()} 
           {renderSelectWithPlaceholder("status", candidate.status, Status, false, "מצב אישי *", "green")}
         </div>


           {/* שורה שלישית */}
           <div className={styles.row}>
             {/* <div className={styles.fieldWrapper}>
               <label className={styles.labelWithDot}>
                 <span className={styles.purpleDot}></span>
                 תאריך לידה *
               </label>
               <input
                type="date"
                name="birthDate"
                className={styles.input}
              />
            </div> */}
            {renderInputField("age", candidate.age, "גיל *", "number", "purple")}
            {renderInputField("candidateId", candidate.id, "מספר זהות *" , "purple")}
       </div>

           {/* שורה רביעית */}
           <div className={styles.row}>
             {renderSelectWithPlaceholder("sector", candidate.sector, Sector, false, "מגזר *", "green")}
             {renderSelectWithPlaceholder("subSector", candidate.subSector, SubSector, false, "תת מגזר *", "green")}
             {/* {renderSelectWithPlaceholder("sector", candidate.sector, Sector, false, "מגזר *", "green")} */}
           </div>

           
           {/* שדות נוספים */}
           <div className={styles.row}>
             {renderSelectWithPlaceholder("languages", candidate.languages, Language, false, "שפות *", "green")}
              {renderInputField("city", candidate.city, "עיר *", "text", "green")}
             {/* {renderSelectWithPlaceholder("openness", candidate.openness, Openness, false, "פתיחות", "green")} */}
           </div>

           {/* טווחי כסף */}
           <div className={styles.row}>
             {renderRangeSlider("giving", candidate.giving, "כמה מבקשים (ועליו לידירה - מקסימום)", 0, 1000000, 25000, "green")}
             {renderRangeSlider("expecting", candidate.expecting, "כמה נותנים (ועליו לידירה - מקסימום)", 0, 1000000, 25000, "green")}
           </div>

            <div className={styles.row}>
              {renderSelectWithPlaceholder("phoneType", candidate.phoneType, PhoneType, false, "סוג טלפון *", "green")}
              {renderSelectWithPlaceholder("openness", candidate.openness, Openness, false, "רמת פתיחות *", "green")}
            </div>

            <div className={styles.row}>
              {renderSelectWithPlaceholder("clothingStyle", candidate.clothingStyle, ClothingStyle, false, "סגנון לבוש *", "green")}
              {renderSelectWithPlaceholder("headCovering", candidate.headCovering, HeadCovering, false, "כיסוי ראש *", "green")}
            </div>

            <div className={styles.row}>
              {renderCheckboxField("license", candidate.license, "רישיון נהיגה *")}
              {renderCheckboxField("beard", candidate.beard, "זקן *")}
            </div>

            <div className={styles.row}>
              {renderSelectWithPlaceholder("physique", candidate.physique, Physique, false, "מבנה גוף *", "green")}
              {renderInputField("origin", candidate.origin, "מוצא *", "text", "green")}
            </div>
              {/* גובה */}
                {/* <HeightSlider
                  value={candidate.height}
                  onChange={(val) => setCandidate((prev: any) => ({ ...prev, height: val }))}
                  min={140}
                  max={200}
                  step={1}
                /> */}
                {renderRangeSlider("height", candidate.height, 'גובה (ס"מ) *', 140, 220, 1, "green")}
          <div className={styles.row}>
            <ColorCircleSelector
              name="hairColor"
              selected={candidate.hairColor}
              onChange={(val) => setCandidate((prev: any) => ({ ...prev, hairColor: val }))}
              options={hairColorOptions}
              labelText="צבע שיער"
            />

            <ColorCircleSelector
              name="skinTone"
              selected={candidate.skinTone}
              onChange={(val) => setCandidate((prev : any) => ({ ...prev, skinTone: val }))}
              options={skinToneOptions}
              labelText="גוון עור"
            />
        </div>

        <div className={styles.row}>
          {renderSelectWithPlaceholder("education", candidate.education, EducationInstitution, false, "מוסד לימודים *", "green")}
          {renderSelectWithPlaceholder("occupation", candidate.occupation, Occupation, false, "עיסוק *", "green")}
        </div>

        <div className={styles.row}>
              {renderSelectWithPlaceholder("torahLearning", candidate.torahLearning, TorahStudy, false, "לומד / עובד *", "green")}
              {renderSelectWithPlaceholder("familyStatus", candidate.familyStatus, ParentsStatus, false, "סטטוס הורים *", "green")}
        </div>

        <div className={styles.row}>
              {renderCheckboxField("availableForProposals", candidate.availableForProposals, "זמין להצעות")}
              {renderSelectWithPlaceholder("smokingStatus", candidate.smokingStatus, Smoking, false, "עישון *", "green")}
        </div>

          {renderTextareaField("descriptionSelf", candidate.descriptionSelf, "תיאור עצמי", "purple")}
          {renderTextareaField("descriptionFind", candidate.descriptionFind, "מה אני מחפש/ת?", "purple")}
        
                {/* העלאת קבצים */}
           <div className={styles.row}>
             {renderFileUpload("image", imageFile, handleImageChange, "העלאת תמונה*", "image/*", "purple")}
             {renderFileUpload("resume", resumeFile, handleResumeChange, "העלאת רזומה *", ".pdf,.doc,.docx", "purple")}
           </div>
      {/* <label className={styles.fieldWrapper}>
        <span className={styles.label}>עיר</span>
        <input name="city" value={candidate.city} onChange={handleInputChange} className={styles.input} />
      </label>

      <label className={styles.fieldWrapper}>
        <span className={styles.label}>מוצא</span>
        <input name="origin" value={candidate.origin} onChange={handleInputChange} className={styles.input} />
      </label>

      <label className={styles.fieldWrapper}>
        <span className={styles.label}>תיאור עצמי</span>
        <textarea name="descriptionSelf" value={candidate.descriptionSelf} onChange={handleInputChange} className={styles.textarea} />
      </label>

      <label className={styles.fieldWrapper}>
        <span className={styles.label}>מה אני מחפש/ת?</span>
        <textarea name="descriptionFind" value={candidate.descriptionFind} onChange={handleInputChange} className={styles.textarea} />
      </label>

      {renderSelectWithPlaceholder("gender", candidate.gender, Gender, false, "מגדר")}
      {renderSelectWithPlaceholder("status", candidate.status, Status, false, "סטטוס")}
      {renderSelectWithPlaceholder("sector", candidate.sector, Sector, false, "מגזר")}
      {renderSelectWithPlaceholder("subSector", candidate.subSector, SubSector, false, "תת מגזר")}
      {renderSelectWithPlaceholder("torahLearning", candidate.torahLearning, TorahStudy, false, "לומד / עובד")}
      {renderSelectWithPlaceholder("education", candidate.education, EducationInstitution, false, "מוסד לימודים")}
      {renderSelectWithPlaceholder("occupation", candidate.occupation, Occupation, false, "עיסוק")}
      {renderSelectWithPlaceholder("languages", candidate.languages, Language, false, "שפה")}
      {renderSelectWithPlaceholder("openness", candidate.openness, Openness, false, "פתיחות")}
      {renderSelectWithPlaceholder("clothingStyle", candidate.clothingStyle, ClothingStyle, false, "סגנון לבוש")}
      {renderSelectWithPlaceholder("physique", candidate.physique, Physique, false, "מבנה גוף")}
      {renderSelectWithPlaceholder("skinTone", candidate.skinTone, SkinTone, false, "צבע עור")}
      {renderSelectWithPlaceholder("hairColor", candidate.hairColor, HairColor, false, "צבע שיער")}
      {renderSelectWithPlaceholder("familyStatus", candidate.familyStatus, ParentsStatus, false, "סטטוס הורים")}
      {renderSelectWithPlaceholder("headCovering", candidate.headCovering, HeadCovering, false, "כיסוי ראש")}
      {renderSelectWithPlaceholder("phoneType", candidate.phoneType, PhoneType, false, "סוג טלפון")}
      {renderSelectWithPlaceholder("smokingStatus", candidate.smokingStatus, Smoking, false, "מצב עישון")}

      <label className={styles.checkboxWrapper}>
        <input name="availableForProposals" type="checkbox" checked={candidate.availableForProposals} onChange={handleInputChange} />
        <span>זמין/ה להצעות</span>
      </label>

      <label className={styles.checkboxWrapper}>
        <input name="beard" type="checkbox" checked={candidate.beard} onChange={handleInputChange} />
        <span>זקן</span>
      </label>

      <label className={styles.checkboxWrapper}>
        <input name="license" type="checkbox" checked={candidate.license} onChange={handleInputChange} />
        <span>רישיון נהיגה</span>
      </label>

      <label className={styles.fieldWrapper}>
        <HeightSlider
          value={candidate.height}
          onChange={(val) => setCandidate((prev: any) => ({ ...prev, height: val }))}
          min={140}
          max={220}
          step={1}
        />

      </label>

      <label className={styles.fieldWrapper}>
        <span className={styles.label}>רמת נתינה: {candidate.giving.toLocaleString()}</span>
        <input
          type="range"
          name="giving"
          min={100000}
          max={2000000}
          step={50000}
          value={candidate.giving}
          onChange={handleInputChange}
          className={styles.range}
        />
      </label>

      <label className={styles.fieldWrapper}>
        <span className={styles.label}>רמת ציפייה: {candidate.expecting.toLocaleString()}</span>
        <input
          type="range"
          name="expecting"
          min={100000}
          max={2000000}
          step={50000}
          value={candidate.expecting}
          onChange={handleInputChange}
          className={styles.range}
        />
      </label>


      <label className={styles.fieldWrapper}>
        <span className={styles.heightLabel}>העלאת תמונה</span>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      <label className={styles.fieldWrapper}>
        <span className={styles.heightLabel}>העלאת רזומה </span>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
      </label>

      {error && <div className={styles.error}>{error}</div>} */}

      <button type="submit" className={styles.submitBtn}>שלח</button>
    </form>
    </div>
  );
};

export default CandidateForm;


//       <form onSubmit={handleSubmit} className={styles.form} dir="rtl">
//         <div className={styles.formGrid}>
          
//           {/* שורה ראשונה */}
//           <div className={styles.row}>
//             {renderInputField("firstName", candidate.firstName, "שם פרטי *", "text", "purple")}
//             {renderInputField("lastName", candidate.lastName, "שם משפחה", "text", "green")}
//           </div>

//           {/* שורה שנייה */}
//           <div className={styles.row}>
//             {renderGenderButtons()}
//             {renderSelectWithPlaceholder("status", candidate.status, Status, false, "מצב אישי *", "green")}
//           </div>

//           {/* שורה שלישית */}
//           <div className={styles.row}>
//             <div className={styles.fieldWrapper}>
//               <label className={styles.labelWithDot}>
//                 <span className={styles.purpleDot}></span>
//                 תאריך לידה *
//               </label>
//               <input
//                 type="date"
//                 name="birthDate"
//                 className={styles.input}
//               />
//             </div>
//             {renderSelectWithPlaceholder("familyStatus", candidate.familyStatus, ParentsStatus, false, "מספר זהות *", "purple")}
//           </div>

//           {/* שורה רביעית */}
//           <div className={styles.row}>
//             {renderInputField("city", candidate.city, "מגזר *", "text", "green")}
//             {renderSelectWithPlaceholder("subSector", candidate.subSector, SubSector, false, "תת מגזר", "green")}
//             {renderSelectWithPlaceholder("sector", candidate.sector, Sector, false, "מגזר *", "green")}
//           </div>

//           {/* העלאת קבצים */}
//           <div className={styles.row}>
//             {renderFileUpload("image", imageFile, handleImageChange, "העלאת ספט שתעודת לידה/שוחרי רשומה בן *", "image/*", "purple")}
//             {renderFileUpload("resume", resumeFile, handleResumeChange, "העלאת זהות של הזוירי *", ".pdf,.doc,.docx", "purple")}
//           </div>

//           {/* שדות נוספים */}
//           <div className={styles.row}>
//             {renderSelectWithPlaceholder("languages", candidate.languages, Language, false, "שפות", "green")}
//             {renderSelectWithPlaceholder("openness", candidate.openness, Openness, false, "פתיחות", "green")}
//           </div>

//           {/* טווחי כסף */}
//           <div className={styles.row}>
//             {renderRangeSlider("giving", candidate.giving, "כמה מבקשים (ועליו לידירה - מקסימום)", 0, 1000000, 25000, "green")}
//             {renderRangeSlider("expecting", candidate.expecting, "כמה נותנים (ועליו לידירה - מקסימום)", 0, 1000000, 25000, "green")}
//           </div>

//           {/* מידע כסכי נוסף */}
//           <div className={styles.fullWidth}>
//             {renderTextareaField("descriptionSelf", candidate.descriptionSelf, "מידע כסכי נוסף", "green")}
//           </div>

//           {/* שדות נוספים */}
//           <div className={styles.row}>
//             {renderSelectWithPlaceholder("physique", candidate.physique, Physique, false, "פלאפון", "green")}
//             {renderSelectWithPlaceholder("phoneType", candidate.phoneType, PhoneType, false, "כשר", "green")}
//           </div>

//           <div className={styles.row}>
//             {renderSelectWithPlaceholder("smokingStatus", candidate.smokingStatus, Smoking, false, "כיסוי ראש", "green")}
//             {renderSelectWithPlaceholder("clothingStyle", candidate.clothingStyle, ClothingStyle, false, "עצני", "green")}
//           </div>

//           {/* גובה */}
//           <div className={styles.fullWidth}>
//             <HeightSlider
//               value={candidate.height}
//               onChange={(val) => setCandidate((prev: any) => ({ ...prev, height: val }))}
//               min={140}
//               max={200}
//               step={1}
//             />
//           </div>

//           {/* קוד קווים */}
//           <div className={styles.fullWidth}>
//             {renderTextareaField("descriptionFind", candidate.descriptionFind, "קוד קווים", "purple")}
//           </div>

//           {/* צבע שיער וצבע עור */}
//           <div className={styles.row}>
//             {renderSelectWithPlaceholder("skinTone", candidate.skinTone, SkinTone, false, "צבע שיער", "green")}
//             {renderSelectWithPlaceholder("hairColor", candidate.hairColor, HairColor, false, "צוון עור", "green")}
//           </div>

//           {/* תיאור עצמי */}
//           <div className={styles.fullWidth}>
//             {renderTextareaField("descriptionSelf", candidate.descriptionSelf, "איפי ותכונות", "green")}
//           </div>

//           {/* החתרבים */}
//           <div className={styles.fullWidth}>
//             {renderTextareaField("descriptionFind", candidate.descriptionFind, "התחרבים, שניות או כל דבר אחר על עצמי", "green")}
//           </div>

//           {/* העלאת תמונות */}
//           <div className={styles.row}>
//             <div className={styles.fieldWrapper}>
//               <label className={styles.labelWithDot}>
//                 <span className={styles.purpleDot}></span>
//                 העלאת תמונות
//               </label>
//               <div className={styles.imageUploadGrid}>
//                 <div className={styles.imageUploadBox}>
//                   <div className={styles.imageUploadIcon}>+</div>
//                 </div>
//                 <div className={styles.imageUploadBox}>
//                   <div className={styles.imageUploadIcon}>+</div>
//                 </div>
//               </div>
//               <div className={styles.imageUploadNote}>
//                 הקובץ יכול להיות בפורמטים JPEG, PNG עד למשקל 7MB
//               </div>
//             </div>
//           </div>

//           {/* צ'קבוקסים */}
//           <div className={styles.checkboxesSection}>
//             {renderCheckboxField("availableForProposals", candidate.availableForProposals, "אני לא מעלימי תמונות באופן עקביו")}
//             {renderCheckboxField("license", candidate.license, "מוכנים לפגישה עם האמא/אבא לפני פגישה")}
//           </div>

//           {/* רישיון */}
//           <div className={styles.checkboxRow}>
//             {renderCheckboxField("beard", candidate.beard, "כן")}
//             {renderCheckboxField("license", candidate.license, "לא מעוניין לציין")}
//             {renderCheckboxField("availableForProposals", candidate.availableForProposals, "לא")}
//             {renderCheckboxField("license", candidate.license, "כן")}
//           </div>

//         </div>

//         {error && <div className={styles.error}>{error}</div>}

//         <button type="submit" className={styles.submitBtn}>
//           עדכון רזומה
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CandidateForm;
