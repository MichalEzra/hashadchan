// types/candidateTypes.ts
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
  ClothingStyle
} from "./enums"

export type Candidate = {
  id: number;
  candidateId: number;
  userId: number;
  firstName: string;
  lastName: string;
  gender: Gender | null;
  status: Status | null;
  age: number;
  sector: Sector | null;
  subSector: SubSector | null;
  torahLearning: TorahStudy | null;
  education: EducationInstitution | null;
  occupation: Occupation | null;
  city: string;
  imageUrl?: string;// תמונה
  origin: string;
  languages: Language | null;
  openness: Openness | null;
  clothingStyle: ClothingStyle | null;
  height: number;
  physique: Physique | null;
  skinTone: SkinTone | null;
  hairColor: HairColor | null;
  giving: number | null;
  expecting: number | null;
  familyStatus: ParentsStatus | null;
  availableForProposals: boolean;
  headCovering: HeadCovering | null;
  phoneType: PhoneType | null;
  beard: boolean;
  smokingStatus: Smoking | null;
  license: boolean;
};
