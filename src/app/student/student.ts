import { Grade } from "../enums/grade";

export interface Student {
  id: number,
  name: string,
  address: string,
  contact: string,
  grade: Grade,
  schoolId: number,
  userId: number
}
