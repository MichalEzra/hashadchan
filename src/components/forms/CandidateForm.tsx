import React, { useEffect, useState } from "react";
import {
  SkinTone,
  HairColor,
  CandidateStatusDisplayMap,
  SubSectorDisplayMap,
  SectorDisplayMap,
  LanguageDisplayMap,
  PhoneTypeDisplayMap,
  OpennessDisplayMap,
  ClothingStyleDisplayMap,
  HeadCoveringDisplayMap,
  PhysiqueDisplayMap,
  EducationInstitutionDisplayMap,
  OccupationDisplayMap,
  TorahStudyDisplayMap,
  ParentsStatusDisplayMap,
  SmokingDisplayMap,
  HairColorDisplayMap,
  SkinToneDisplayMap,
} from "../../types/enums";
import { createCandidate } from "../../redux/thunks/candidates.thunks";
import styles from "../design/CandidateForm.module.css";
import { useParams } from "react-router-dom";
import { CandidateDto } from "../../types/candidateDto.types";
import { useAppDispatch } from "../../redux/store";

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
  { value: HairColor.HUM, label: HairColorDisplayMap.חום, hex: '#6B4423' },
  { value: HairColor.SHAHOR, label: HairColorDisplayMap.שחור, hex: ' #000000' },
  { value: HairColor.SHATANI, label: HairColorDisplayMap.שטני, hex: 'rgb(230, 175, 81)' },
  { value: HairColor.BLONDI, label: HairColorDisplayMap.בלונדי, hex: 'rgb(250, 235, 104)' },
  { value: HairColor.GINGI, label: HairColorDisplayMap.גינגי, hex: 'rgb(254, 160, 45)' },
];

//צבע גוף
const skinToneOptions = [
  { value: SkinTone.BAHIR, label: SkinToneDisplayMap.בהיר, hex: 'rgb(255, 220, 202) ' },
  { value: SkinTone.NOTE_LE_BAHIR, label: SkinToneDisplayMap.נוטה_לבהיר, hex: 'rgb(255, 218, 175) ' },
  { value: SkinTone.SHAZUF, label: SkinToneDisplayMap.שזוף, hex: 'rgb(230, 189, 157)' },
  { value: SkinTone.NOTE_LE_KEHA, label: SkinToneDisplayMap.נוטה_לכהה, hex: 'rgb(212, 167, 138)' },
  { value: SkinTone.KEHA, label: SkinToneDisplayMap.כהה, hex: 'rgb(182, 127, 91)' },
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
  candidate: CandidateDto;
  onChange: (updated: CandidateDto) => void;
}



const CandidateForm: React.FC = () => {
  const { id } = useParams();

  const initialCandidate: any = {
    firstName: "",
    lastName: "",
    gender: "",
    candidateId: "",
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
    email: "",
    studyPlaceName: "",
  };

  const [candidate, setCandidate] = useState(initialCandidate);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [formState, setFormState] = useState(candidate || initialCandidate);
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (candidate) {
      setCandidate(candidate);
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
        value.forEach((v) => formData.append(key, v.toString()));
      } else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    if (imageFile) formData.append("fileImage", imageFile);
    if (resumeFile) formData.append("RezumehFile", resumeFile);

    try {
      const result = await dispatch(createCandidate(formData)).unwrap();
      console.log("✅ נוצר מועמד בהצלחה", result);
    } catch (err) {
      console.error("❌ שגיאה ביצירת מועמד", err);
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
          className={`${styles.genderButton} ${candidate.gender === 'נקבה' ? styles.active : ''}`}
          onClick={() => setCandidate((prev: typeof candidate) => ({ ...prev, gender: 'נקבה' }))}
        >
          <div className={styles.genderIcon}>👤</div>
          אישה
        </button>
        <button
          type="button"
          className={`${styles.genderButton} ${candidate.gender === 'זכר' ? styles.active : ''}`}
          onClick={() => setCandidate((prev: typeof candidate) => ({ ...prev, gender: 'זכר' }))}
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
) => {
  const inputId = `file-input-${name}`;

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={`${styles.dot} ${styles[dotColor + 'Dot']}`}></span>
        {labelText}
      </label>

      <div className={styles.fileUpload}>
        {/* עטיפת הקופסה והאינפוט יחד בתוך label */}
        <label htmlFor={inputId} className={styles.fileUploadBox}>
          <div className={styles.fileUploadIcon}>+</div>
          <div className={styles.fileUploadText}>
            {file ? file.name : `קובץ ${labelText.toLowerCase()}`}
          </div>
        </label>

        <input
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          onChange={onChange}
          className={styles.fileInput}
          style={{ display: 'none' }} // מוסתר אבל פועל
        />
      </div>

      <div className={styles.fileHint}>
        הקובץ יכול להיות בפורמטים {accept.replace(/\./g, '').toUpperCase()} עד למשקל 7MB
      </div>
    </div>
  );
};


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
          {renderSelectWithPlaceholder("status", candidate.status, CandidateStatusDisplayMap, false, "מצב אישי *", "green")}
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
          {renderInputField("candidateId", candidate.candidateId, "מספר זהות *", "purple")}
        </div>

        {/* שורה רביעית */}
        <div className={styles.row}>
          {renderSelectWithPlaceholder("sector", candidate.sector, SectorDisplayMap, false, "מגזר *", "green")}
          {renderSelectWithPlaceholder("subSector", candidate.subSector, SubSectorDisplayMap, false, "תת מגזר *", "green")}
          {/* {renderSelectWithPlaceholder("sector", candidate.sector, Sector, false, "מגזר *", "green")} */}
        </div>


        {/* שדות נוספים */}
        <div className={styles.row}>
          {renderSelectWithPlaceholder("languages", candidate.languages, LanguageDisplayMap, false, "שפות *", "green")}
          {renderInputField("city", candidate.city, "עיר *", "text", "green")}
          {/* {renderSelectWithPlaceholder("openness", candidate.openness, Openness, false, "פתיחות", "green")} */}
        </div>

        {/* טווחי כסף */}
        <div className={styles.row}>
          {renderRangeSlider("giving", candidate.giving, "כמה מבקשים (סיוע לדירה - מקסימום)", 0, 1000000, 25000, "green")}
          {renderRangeSlider("expecting", candidate.expecting, "כמה נותנים (סיוע לדירה - מינימום)", 0, 1000000, 25000, "green")}
        </div>

        <div className={styles.row}>
          {renderSelectWithPlaceholder("phoneType", candidate.phoneType, PhoneTypeDisplayMap, false, "סוג טלפון *", "green")}
          {renderSelectWithPlaceholder("openness", candidate.openness, OpennessDisplayMap, false, "רמת פתיחות *", "green")}
        </div>

        <div className={styles.row}>
          {renderSelectWithPlaceholder("clothingStyle", candidate.clothingStyle, ClothingStyleDisplayMap, false, "סגנון לבוש *", "green")}
          {renderSelectWithPlaceholder("headCovering", candidate.headCovering, HeadCoveringDisplayMap, false, "כיסוי ראש *", "green")}
        </div>

        <div className={styles.row}>
          {renderCheckboxField("license", candidate.license, "רישיון נהיגה *")}
          {renderCheckboxField("beard", candidate.beard, "זקן *")}
        </div>

        <div className={styles.row}>
          {renderSelectWithPlaceholder("physique", candidate.physique, PhysiqueDisplayMap, false, "מבנה גוף *", "green")}
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
            onChange={(val) => setCandidate((prev: any) => ({ ...prev, skinTone: val }))}
            options={skinToneOptions}
            labelText="גוון עור"
          />
        </div>

        <div className={styles.row}>
          {renderSelectWithPlaceholder("education", candidate.education, EducationInstitutionDisplayMap, false, "מוסד לימודים *", "green")}
          {renderSelectWithPlaceholder("occupation", candidate.occupation, OccupationDisplayMap, false, "עיסוק *", "green")}
          {renderInputField("studyPlaceName", candidate.studyPlaceName, "שם מוסד לימודים *", "purple")}

        </div>

        <div className={styles.row}>
          {renderSelectWithPlaceholder("torahLearning", candidate.torahLearning, TorahStudyDisplayMap, false, "לומד / עובד *", "green")}
          {renderSelectWithPlaceholder("familyStatus", candidate.familyStatus, ParentsStatusDisplayMap, false, "סטטוס הורים *", "green")}
        </div>

        <div className={styles.row}>
          {renderInputField("email", candidate.email, "אימייל *", "email", "purple")}
          {renderSelectWithPlaceholder("smokingStatus", candidate.smokingStatus, SmokingDisplayMap, false, "עישון *", "green")}
        </div>

        {renderTextareaField("descriptionSelf", candidate.descriptionSelf, "תיאור עצמי", "purple")}
        {renderTextareaField("descriptionFind", candidate.descriptionFind, "מה אני מחפש/ת?", "purple")}

        {/* העלאת קבצים */}
        <div className={styles.row}>
          {renderFileUpload("image", imageFile, handleImageChange, "העלאת תמונה*", "image/*", "purple")}
          {renderFileUpload("resume", resumeFile, handleResumeChange, "העלאת רזומה *", ".pdf,.doc,.docx", "purple")}
        </div>
        <div className={styles.row}>
          {renderCheckboxField("availableForProposals", candidate.availableForProposals, "זמין להצעות")}
        </div>
        <button type="submit" className={styles.submitBtn}>שלח</button>
      </form>
    </div>
  );
};

export default CandidateForm;
