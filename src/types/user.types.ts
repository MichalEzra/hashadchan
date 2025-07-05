import { CandidateDto } from "./candidateDto.types";
import { UserType } from "./enums";

export type User = {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  userType: UserType;
  candidates?: CandidateDto[];
};
export type RegisterUserDto = Omit<User, 'id'>;

// types/auth.types.ts
export type JwtUserType = UserType | 'GUEST';

export interface JwtUser {
  id: number;
  email: string;
  fullName: string;
  userType: JwtUserType;
  candidates?: CandidateDto[];
  // הוסף כאן מאפייני משתמש נוספים שה-JWT שלך עשוי למפות אליהם
}

export type UserLoginType = {
  email: string,
  fullName: string,
  id?: number;
  userType: UserType;
}



export type AuthUser = {
  // user: {
  //   id?: number;
  //   fullName: string;
  //   email: string;
  //   password: string;
  //   phoneNumber?: string;
  //   userType: "ADMIN" | "MATCHMAKER" | "PARENT" ;
  //   candidate?: Candidate;
  // },
  token: string
}