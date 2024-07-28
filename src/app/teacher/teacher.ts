import { SchoolSubject } from "../enums/subjects";

export interface Teacher {
  id: number,
  name: string,
  address: string,
  contact: string,
  subject: SchoolSubject,
  schoolId: number,
  userId: number
}
