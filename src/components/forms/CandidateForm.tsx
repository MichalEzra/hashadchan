import React, { useEffect, useState } from "react";
import {
  Gender,
  candidateSector,
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
  Status,
} from "../../types/enums";
import {createCandidate,  getCandidate,  updateCandidate,} from "../../services/candidate.service";
import styles from "../design/CandidateForm.module.css";
import { useParams } from "react-router-dom";
import { Candidate } from "../../types/candidate.types";

//זה אחראי בעצם על העיגולים של הצבעים, הבנת???
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
//צבע שיער
const hairColorOptions = [
  { value: 'BROWN', label: HairColor.HUM, hex: '#6B4423' },
  { value: 'BLACK', label: HairColor.SHAHOR, hex: ' #000000' },
  { value: 'DIRTY_BLONDE', label: HairColor.SHATANI, hex: 'rgb(230, 175, 81)' },
  { value: 'BLONDE', label: HairColor.BLONDI, hex: 'rgb(250, 235, 104)' },
  { value: 'REDHEAD', label: HairColor.GINGI, hex: 'rgb(254, 160, 45)' },
];

//צבע גוף
const skinToneOptions = [
  { value: 'FAIR', label: SkinTone.BAHIR, hex: 'rgb(255, 220, 202) ' },
  { value: 'FAIR_TO_MEDIUM', label: SkinTone.NOTE_LE_BAHIR, hex: 'rgb(255, 218, 175) ' },
  { value: 'TAN', label: SkinTone.SHAZUF, hex: 'rgb(230, 189, 157)' },
  { value: 'MEDIUM_TO_DARK', label: SkinTone.NOTE_LE_KEHA, hex: 'rgb(212, 167, 138)' },
  { value: 'DARK', label: SkinTone.KEHA, hex: 'rgb(182, 127, 91)' },
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


interface CandidateFormProps {
  candidate: Candidate;
  onChange: (updated: Candidate) => void;
}



const CandidateForm: React.FC= () => {
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
    const [formState, setFormState] = useState(candidate || initialCandidate);

useEffect(() => {
  if (candidate) {
    setFormState(candidate);
  }
}, [candidate]);

  // useEffect(() => {
  //   if (id) {
  //     getCandidate(Number(id)).then((data) => {
  //       setCandidate(data);
  //     });
  //   }
  // }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormState((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, options, multiple } = e.target;
    if (multiple) {
      const selected = Array.from(options).filter((o) => o.selected).map((o) => o.value);
      setFormState((prev: any) => ({ ...prev, [name]: selected }));
    } else {
      setFormState((prev: any) => ({ ...prev, [name]: value }));
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
        await createCandidate(formData);
        alert("מועמד נוסף בהצלחה");
      }
    } catch {
      setError("שגיאה בשליחה");
    }
  };
//פונקציה שאחראית על המשתנים שיש להם רשימה של אפשרויות לבחירה
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
  //פונקציה שאחראית על שדות קלט רגילים, כמו שם פרטי, שם משפחה, גיל וכו'
  //היא גם אחראית על הצבע של הנקודה שליד השם
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


//אחראית על תיבת טקסט שצריך לכתוב בתוכה את התוכן, לגומא: תיאור עצמי
  //היא גם אחראית על הצבע של הנקודה שליד השם
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

  //אחראית על תיבת סימון, לגומא: רישיון נהיגה, זקן
  //היא גם אחראית על הצבע של הנקודה שליד השם
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
//אחראית על הסליידר של טווחים, לגומא: כמה מבקשים, כמה נותנים
  //היא גם אחראית על הצבע של הנקודה שליד השם
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
//אחראית על כפתורי המגדר, לגומא: אישה, גבר
  //היא גם אחראית על הצבע של הנקודה שליד השם
  const renderGenderButtons = () => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={styles.greenDot}></span>
        מגדר *
      </label>
      <div className={styles.genderButtons}>
        <button
          type="button"
          className={`${styles.genderButton} ${formState.gender === 'נקבה' ? styles.active : ''}`}
          onClick={() => setFormState((prev : typeof formState) => ({...prev, gender: 'נקבה'}))}
        >
          <div className={styles.genderIcon}>👤</div>
          אישה
        </button>
        <button
          type="button"
          className={`${styles.genderButton} ${formState.gender === 'זכר' ? styles.active : ''}`}
          onClick={() => setFormState((prev : typeof formState) => ({...prev, gender: 'זכר'}))}
        >
          <div className={styles.genderIcon}>👤</div>
          גבר
        </button>
      </div>
    </div>
  );
//אחראית על העלאת קבצים, לגומא: תמונה, רזומה
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
            {renderInputField("firstName", formState.firstName, "שם פרטי *", "text", "purple")}
           {renderInputField("lastName", formState.lastName, "שם משפחה", "text", "green")}
        </div>

           {/* שורה שנייה */}
          <div className={styles.row}>
          {renderGenderButtons()} 
           {renderSelectWithPlaceholder("status", formState.status, Status, false, "מצב אישי *", "green")}
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
            {renderInputField("age", formState.age, "גיל *", "number", "purple")}
            {renderInputField("candidateId", formState.id, "מספר זהות *" , "purple")}
       </div>

           {/* שורה רביעית */}
           <div className={styles.row}>
             {renderSelectWithPlaceholder("sector", candidate.sector, candidateSector, false, "מגזר *", "green")}
             {renderSelectWithPlaceholder("subSector", candidate.subSector, SubSector, false, "תת מגזר *", "green")}
             {/* {renderSelectWithPlaceholder("sector", candidate.sector, Sector, false, "מגזר *", "green")} */}
           </div>

           
           {/* שדות נוספים */}
           <div className={styles.row}>
             {renderSelectWithPlaceholder("languages", formState.languages, Language, false, "שפות *", "green")}
              {renderInputField("city", formState.city, "עיר *", "text", "green")}
             {/* {renderSelectWithPlaceholder("openness", candidate.openness, Openness, false, "פתיחות", "green")} */}
           </div>

           {/* טווחי כסף */}
           <div className={styles.row}>
             {renderRangeSlider("giving", formState.giving, "כמה מבקשים (ועליו לידירה - מקסימום)", 0, 1000000, 25000, "green")}
             {renderRangeSlider("expecting", formState.expecting, "כמה נותנים (ועליו לידירה - מקסימום)", 0, 1000000, 25000, "green")}
           </div>

            <div className={styles.row}>
              {renderSelectWithPlaceholder("phoneType", formState.phoneType, PhoneType, false, "סוג טלפון *", "green")}
              {renderSelectWithPlaceholder("openness", formState.openness, Openness, false, "רמת פתיחות *", "green")}
            </div>

            <div className={styles.row}>
              {renderSelectWithPlaceholder("clothingStyle", formState.clothingStyle, ClothingStyle, false, "סגנון לבוש *", "green")}
              {renderSelectWithPlaceholder("headCovering", formState.headCovering, HeadCovering, false, "כיסוי ראש *", "green")}
            </div>

            <div className={styles.row}>
              {renderCheckboxField("license", formState.license, "רישיון נהיגה *")}
              {renderCheckboxField("beard", formState.beard, "זקן *")}
            </div>

            <div className={styles.row}>
              {renderSelectWithPlaceholder("physique", formState.physique, Physique, false, "מבנה גוף *", "green")}
              {renderInputField("origin", formState.origin, "מוצא *", "text", "green")}
            </div>
              {/* גובה */}
                {/* <HeightSlider
                  value={candidate.height}
                  onChange={(val) => setCandidate((prev: any) => ({ ...prev, height: val }))}
                  min={140}
                  max={200}
                  step={1}
                /> */}
                {renderRangeSlider("height", formState.height, 'גובה (ס"מ) *', 140, 220, 1, "green")}
          <div className={styles.row}>
            <ColorCircleSelector
              name="hairColor"
              selected={formState.hairColor}
              onChange={(val) => setFormState((prev: any) => ({ ...prev, hairColor: val }))}
              options={hairColorOptions}
              labelText="צבע שיער"
            />

            <ColorCircleSelector
              name="skinTone"
              selected={formState.skinTone}
              onChange={(val) => setFormState((prev : any) => ({ ...prev, skinTone: val }))}
              options={skinToneOptions}
              labelText="גוון עור"
            />
        </div>

        <div className={styles.row}>
          {renderSelectWithPlaceholder("education", formState.education, EducationInstitution, false, "מוסד לימודים *", "green")}
          {renderSelectWithPlaceholder("occupation", formState.occupation, Occupation, false, "עיסוק *", "green")}
        </div>

        <div className={styles.row}>
              {renderSelectWithPlaceholder("torahLearning", formState.torahLearning, TorahStudy, false, "לומד / עובד *", "green")}
              {renderSelectWithPlaceholder("familyStatus", formState.familyStatus, ParentsStatus, false, "סטטוס הורים *", "green")}
        </div>

        <div className={styles.row}>
              {renderCheckboxField("availableForProposals", formState.availableForProposals, "זמין להצעות")}
              {renderSelectWithPlaceholder("smokingStatus", formState.smokingStatus, Smoking, false, "עישון *", "green")}
        </div>

          {renderTextareaField("descriptionSelf", formState.descriptionSelf, "תיאור עצמי", "purple")}
          {renderTextareaField("descriptionFind", formState.descriptionFind, "מה אני מחפש/ת?", "purple")}
        
                {/* העלאת קבצים */}
           <div className={styles.row}>
             {renderFileUpload("image", imageFile, handleImageChange, "העלאת תמונה*", "image/*", "purple")}
             {renderFileUpload("resume", resumeFile, handleResumeChange, "העלאת רזומה *", ".pdf,.doc,.docx", "purple")}
           </div>

      <button type="submit" className={styles.submitBtn}>שלח</button>
    </form>
    </div>
  );
};

export default CandidateForm;
