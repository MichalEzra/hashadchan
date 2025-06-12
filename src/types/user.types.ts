 import { Candidate } from "./candidate.types";
 
export type User = {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  userType: "ADMIN" | "MATCHMAKER" | "PARENT" ;
  candidate?: Candidate;
};



export type UserType = {
    email: string,
    password: string
}

export type AuthUser = {
    user: {
      id?: number;
      fullName: string;
      email: string;
      password: string;
      phoneNumber?: string;
      userType: "ADMIN" | "MATCHMAKER" | "PARENT" ;
      candidate?: Candidate;
    },
    token: string
}