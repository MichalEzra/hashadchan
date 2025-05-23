import { User } from "./user.types";
export type Matchmaker = {
  id: number;
  userId: number;
  user: User; // צריך לוודא שיש לך גם טיפוס User תואם
  firstName: string;
  lastName: string;
  birthDate: string; // DateTime ב-C# -> string בפורמט ISO בתקשורת עם ה-API
  matchmakerGender: string; // Gender ב-C# -> string או enum
  identityNumber: string;
  marriageDate?: string; // תאריך נישואין – שדה אופציונלי
  country?: string;
  city?: string;
  matchmakerSector: string;
  subSector?: string;
  yearsOfExperience?: number;
  matchesClosed?: number;
  languages: string;
  religiousOpenness: string;
  phoneNumber: string;
};
