// types/candidateTypes.ts
import{Gender} from "./enums"
export type Candidate = {
  id: number;
  candidateId: number;
  userId: number;
  firstName: string;
  lastName: string;
  candidateGender:string;
  status: string;
  age: number;
  candidateSector: string;
  subSector: string;
  torahLearning: string;
  education: string;
  jobOrStudies: string;
  city: string;
  imageUrl?: string;// תמונה
  origin: string;
  languages: string;
  religiousOpenness: string;
  clothingStyle: string;
  height: number;
  physique: string;
  skinTone: string;
  hairColor: string;
  giving: number | null;
  expecting: number | null;
  familyStatus: string;
  availableForProposals: boolean;
  preferredHeadCovering: string;
  candidatePhoneType: string;
  beard: boolean;
  smokingStatus: string;
  license: boolean;
};
