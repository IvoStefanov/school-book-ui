import { SchoolSubject } from "../enums/subjects";
import { School } from "../school/school";

export interface Teacher {
  id: number,
  name: string,
  address: string,
  contact: string,
  subject: SchoolSubject,
  school: School,
  userId: number
}
