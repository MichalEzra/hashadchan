 import { Candidate } from "./candidate.types";
import { UserType } from "./enums";
 
export type User = {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  userType: UserType ;
  candidate?: Candidate;
};
export type RegisterUserDto = Omit<User, 'id'>;

// types/auth.types.ts
export type JwtUserType = UserType | 'GUEST';

export interface JwtUser {
  id: string;
  email: string;
  fullName: string;
  userType: JwtUserType;
  // הוסף כאן מאפייני משתמש נוספים שה-JWT שלך עשוי למפות אליהם
}

export type UserLoginType ={
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