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

export type UserLoginType ={
    email: string,
    fullName: string,
    id?: number;
    userType: "ADMIN" | "MATCHMAKER" | "PARENT";
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