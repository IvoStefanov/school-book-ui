import { Grade } from "../enums/grade";
import { Parent } from "../parent/parent";
import { School } from "../school/school";

export interface Student {
  id: number,
  name: string,
  address: string,
  contact: string,
  grade: Grade,
  parent: Parent,
  school: School,
  userId: number
}
