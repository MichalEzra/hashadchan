import { Gender, Language, Openness, candidateSector, SubSector } from "./enums";
import { User } from "./user.types";
export type Matchmaker = {
  id: number;
  userId: number;
  user: User; // צריך לוודא שיש לך גם טיפוס User תואם
  firstName: string;
  lastName: string;
  birthDate: string; // DateTime ב-C# -> string בפורמט ISO בתקשורת עם ה-API
  matchmakerGender: Gender | null; // Gender ב-C# -> string או enum
  identityNumber: string;
  marriageDate?: string; // תאריך נישואין – שדה אופציונלי
  country?: string;
  city?: string;
  matchmakerSector: candidateSector | null; // Sector ב-C# -> string או enu
  subSector?: SubSector | null;
  yearsOfExperience?: number;
  matchesClosed?: number;
  languages: Language | null;
  religiousOpenness: Openness | null;
  phoneNumber: string;
};
