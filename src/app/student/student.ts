import { Grade } from "../enums/grade";
import { School } from "../school/school";

export interface Student {
  id: number,
  name: string,
  address: string,
  contact: string,
  grade: Grade,
  parentId: number,
  school: School,
  userId: number
}
