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
  ClothingStyle
} from "./enums"; // ודא שהנתיב ל-enums נכון

// הטיפוס הקיים שלך Candidate (ככל הנראה אמור להיות CandidateDto במקרה זה)
export type CandidateDto = {
  id: number;
  candidateId: number;
  userId: number;
  firstName: string;
  lastName: string;
  gender: Gender | null;
  status: string; // שיניתי ל-string בהתאם לדוגמת ה-JSON שסיפקת ("רווק_ה")
  age: number;
  candidateSector: candidateSector | null;
  subSector: SubSector | null;
  torahLearning: TorahStudy | null;
  education: EducationInstitution | null;
  jobOrStudies: Occupation | null; // שונה מ-occupation ל-jobOrStudies כדי להתאים ל-JSON
  studyPlaceName: string | null;
  city: string;
  arrImage: string; // שונה מ-imageUrl ל-arrImage כדי להתאים ל-JSON
  fileImage: File | null; // חדש, כדי לייצג את ה-fileImage ב-JSON
  imageUrl: string | null; // חדש, כדי לייצג את ה-imageUrl ב-JSON
  rezumehName?: string; // קובץ קורות חיים (PDF וכו')
  rezumehArr: string; // חדש, כדי לייצג את ה-rezumehArr ב-JSON
  rezumehFile: File | null; // חדש, כדי לייצג את ה-rezumehFile ב-JSON
  origin: string;
  languages: Language | null;
  religiousOpenness: Openness | null; // שונה מ-openness ל-religiousOpenness
  clothingStyle: ClothingStyle | null;
  height: number;
  physique: Physique | null;
  skinTone: SkinTone | null;
  hairColor: HairColor | null;
  giving: number | null;
  expecting: number | null;
  familyStatus: ParentsStatus | null;
  availableForProposals: boolean;
  preferredHeadCovering: HeadCovering | null; // שונה מ-headCovering
  candidatePhoneType: PhoneType | null; // שונה מ-phoneType
  beard: boolean;
  smokingStatus: Smoking | null;
  license: boolean;
  descriptionSelf: string; // חדש, כדי לייצג את ה-descriptionSelf ב-JSON
  descriptionFind: string; // חדש, כדי לייצג את ה-descriptionFind ב-JSON
  email: string | null; // חדש
  phoneNumber: string | null; // חדש
};

// הטיפוס החדש עבור תוצאות ההתאמה
export interface MatchResultsDto {
  male: CandidateDto;
  female: CandidateDto;
  score: number;
}

export interface MatchRequest { // שימו לב: כאן זה idCandidate1, idCandidate2 עם i קטנה
  idCandidate1: number;
  idCandidate2: number;
}
