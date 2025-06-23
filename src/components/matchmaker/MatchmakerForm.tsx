import React, { useEffect, useState } from "react";
import {
  Gender,
  Language,
  Openness,
  SubSector,
  // אם יש צורך ב-enums נוספים לשדכן, הוסף אותם כאן
  Sector, // משתמשים ב-Sector הכללי לבינתיים
} from "../../types/enums"; // ודא שהנתיב הזה נכון בפרויקט שלך - ייתכן שתצטרך לשנות אותו
import styles from "../design/CandidateForm.module.css"; // ודא שהנתיב הזה נכון בפרויקט שלך - ייתכן שתצטרך לשנות אותו
import { useParams } from "react-router-dom";
import { createMatchmaker, getAllMatchmakers, getMatchmakerById, updateMatchmaker } from "../../services/matchmaker.service";

// ממשק Matchmaker כפי שסופק
interface Matchmaker {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  matchmakerGender: Gender | null;
  identityNumber: string;
  marriageDate?: string;
  country?: string;
  city?: string;
  matchmakerSector: string; // השתמש ב-string או צור enum ספציפי אם יש
  subSector?: SubSector | null;
  yearsOfExperience?: number;
  matchesClosed?: number;
  languages: Language | null;
  religiousOpenness: Openness | null;
  phoneNumber: string;
}

// // פונקציות mock לשירותי שדכנים - החלף אותן באמיתיות שלך
// const createMatchmaker = async (formData: FormData) => {
//   console.log("Mock: Creating matchmaker with data:", Object.fromEntries(formData.entries()));
//   return new Promise(resolve => setTimeout(() => {
//     // במקום alert(), השתמש ב-console.log או במערכת הודעות UI מתאימה
//     console.log("שדכן נוסף בהצלחה (Mock)");
//     resolve({ id: 123, ...Object.fromEntries(formData.entries()) });
//   }, 1000));
// };

// const getMatchmaker = async (id: number): Promise<Matchmaker> => {
//   console.log("Mock: Getting matchmaker with ID:", id);
//   return new Promise(resolve => setTimeout(() => {
//     // נתוני mock של שדכן
//     resolve({
//       id: id,
//       userId: 1,
//       firstName: "חיה",
//       lastName: "כהן",
//       birthDate: "1980-05-15",
//       matchmakerGender: Gender.FEMALE,
//       identityNumber: "123456789",
//       marriageDate: "2000-10-20",
//       country: "ישראל",
//       city: "בני ברק",
//       matchmakerSector: "חרדי",
//       subSector: SubSector.BALEI_TSHUVA,
//       yearsOfExperience: 10,
//       matchesClosed: 50,
//       languages: Language.HEBREW,
//       religiousOpenness: Openness.OPEN,
//       phoneNumber: "050-1234567",
//     });
//   }, 1000));
// };

// const updateMatchmaker = async (id: number, formData: FormData) => {
//   console.log("Mock: Updating matchmaker with ID", id, "and data:", Object.fromEntries(formData.entries()));
//   return new Promise(resolve => setTimeout(() => {
//     // במקום alert(), השתמש ב-console.log או במערכת הודעות UI מתאימה
//     console.log("השדכן עודכן בהצלחה (Mock)");
//     resolve({ id: id, ...Object.fromEntries(formData.entries()) });
//   }, 1000));
// };

const MatchmakerForm: React.FC = () => {
  const { id } = useParams();

  const initialMatchmaker: any = {
    // id: 0,
    // userId: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    matchmakerGender: "",
    identityNumber: "",
    marriageDate: "",
    country: "",
    city: "",
    matchmakerSector: "", // או ערך ברירת מחדל מה-enum אם יש
    subSector: "",
    yearsOfExperience: 0,
    matchesClosed: 0,
    languages: "",
    religiousOpenness: "",
    phoneNumber: "",
  };

  const [matchmaker, setMatchmaker] = useState<Matchmaker>(initialMatchmaker);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getMatchmakerById(Number(id)).then((data : any) => { // Type annotation removed here as it's already defined in getMatchmaker
        setMatchmaker(data);
      }).catch(err => {
        setError("שגיאה בטעינת נתוני שדכן: " + err.message);
        console.error(err);
      });
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setMatchmaker((prev: Matchmaker) => ({ // Type for prev added
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, options, multiple } = e.target;
    if (multiple) {
      const selected = Array.from(options).filter((o) => o.selected).map((o) => o.value);
      setMatchmaker((prev: Matchmaker) => ({ ...prev, [name]: selected })); // Type for prev added
    } else {
      setMatchmaker((prev: Matchmaker) => ({ ...prev, [name]: value })); // Type for prev added
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file && !file.type.startsWith("image/")) {
  //     setError("נא לבחור קובץ תמונה חוקי");
  //     return;
  //   }
  //   setImageFile(file || null);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(matchmaker).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    // if (imageFile) formData.append("fileImage", imageFile); // אם השדכן מעלה תמונה

    console.log("Form data being sent:", Object.fromEntries(formData.entries()));
    try {
      if (id) {
        await updateMatchmaker(Number(id), formData);
      } else {
        await createMatchmaker(formData);
      }
      setError(null); // Clear any previous errors on successful submission
    } catch (err) {
      setError("שגיאה בשליחה: " + (err instanceof Error ? err.message : String(err))); // Improved error handling
      console.error(err);
    }
  };

  // פונקציה שאחראית על המשתנים שיש להם רשימה של אפשרויות לבחירה
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
        value={value === null || value === undefined ? "" : value} // טיפול בערכי null/undefined עבור select
        onChange={handleSelectChange}
        multiple={multiple}
        className={styles.select}
      >
        {!multiple && <option value="" disabled>בחר/י</option>}
        {/* לוודא שאפשרויות ה-enum הן Object.values במקום Object.entries אם האפשרויות הן רק ערכים */}
        {Object.values(options).map((val) => (
          <option key={String(val)} value={String(val)}>
            {String(val)}
          </option>
        ))}
      </select>
    </div>
  );

  // פונקציה שאחראית על שדות קלט רגילים
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
        value={value || ''} // ודא שערכים ריקים מוצגים כריק ולא כ-null/undefined
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  );

  // אחראית על כפתורי המגדר
  const renderGenderButtons = () => (
    <div className={styles.fieldWrapper}>
      <label className={styles.labelWithDot}>
        <span className={styles.greenDot}></span>
        מגדר *
      </label>
      <div className={styles.genderButtons}>
        <button
          type="button"
          className={`${styles.genderButton} ${matchmaker.matchmakerGender === Gender.NEKEVA ? styles.active : ''}`}
          onClick={() => setMatchmaker((prev : Matchmaker) => ({...prev, matchmakerGender: Gender.NEKEVA}))}
        >
          <div className={styles.genderIcon}>👤</div>
          אישה
        </button>
        <button
          type="button"
          className={`${styles.genderButton} ${matchmaker.matchmakerGender === Gender.ZACHOR ? styles.active : ''}`}
          onClick={() => setMatchmaker((prev : Matchmaker) => ({...prev, matchmakerGender: Gender.ZACHOR}))}
        >
          <div className={styles.genderIcon}>👤</div>
          גבר
        </button>
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
            <h2> פרופיל שדכן</h2>
          </div>
        </div>
        <div className={styles.formTitle}>פרטי שדכן</div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} dir="rtl">

        {/* שורה ראשונה: שם פרטי, שם משפחה */}
        <div className={styles.row}>
          {renderInputField("firstName", matchmaker.firstName, "שם פרטי *", "text", "purple")}
          {renderInputField("lastName", matchmaker.lastName, "שם משפחה *", "text", "green")}
        </div>

        {/* שורה שנייה: תאריך לידה, מגדר */}
        <div className={styles.row}>
          {renderInputField("birthDate", matchmaker.birthDate, "תאריך לידה *", "date", "purple")}
          {renderGenderButtons()}
        </div>

        {/* שורה שלישית: מספר זהות, מספר טלפון */}
        <div className={styles.row}>
          {renderInputField("identityNumber", matchmaker.identityNumber, "מספר זהות *", "text", "green")}
          {renderInputField("phoneNumber", matchmaker.phoneNumber, "מספר טלפון *", "tel", "green")}
        </div>

        {/* שורה רביעית: תאריך נישואין, עיר */}
        <div className={styles.row}>
          {renderInputField("marriageDate", matchmaker.marriageDate, "תאריך נישואין", "date", "blue")}
          {renderInputField("city", matchmaker.city, "עיר", "text", "green")}
        </div>

        {/* שורה חמישית: מדינה, מגזר השדכן */}
        <div className={styles.row}>
          {renderInputField("country", matchmaker.country, "מדינה", "text", "blue")}
          {renderSelectWithPlaceholder("matchmakerSector", matchmaker.matchmakerSector, Sector, false, "מגזר *", "green")}
        </div>

        {/* שורה שישית: תת מגזר, שפות */}
        <div className={styles.row}>
          {renderSelectWithPlaceholder("subSector", matchmaker.subSector, SubSector, false, "תת מגזר", "blue")}
          {renderSelectWithPlaceholder("languages", matchmaker.languages, Language, false, "שפות *", "green")}
        </div>

        {/* שורה שביעית: שנות ניסיון, מספר שידוכים שנסגרו */}
        <div className={styles.row}>
          {renderInputField("yearsOfExperience", matchmaker.yearsOfExperience, "שנות ניסיון", "number", "purple")}
          {renderInputField("matchesClosed", matchmaker.matchesClosed, "שידוכים שנסגרו", "number", "purple")}
        </div>

        {/* שדה: רמת פתיחות דתית */}
        <div className={styles.row}>
          {renderSelectWithPlaceholder("religiousOpenness", matchmaker.religiousOpenness, Openness, false, "רמת פתיחות דתית *", "green")}
          {/* שדה ריק כדי לשמור על עיצוב 2 עמודות */}
          <div></div>
        </div>
        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn}>שמור פרטי שדכן</button>
      </form>
    </div>
  );
};

export default MatchmakerForm;
