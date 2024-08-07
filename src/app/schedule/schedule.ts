import { Date } from "../enums/date";
import { Grade } from "../enums/grade";

export interface Schedule {
  id: number,
  schoolId: number,
  grade: Grade,
  teacherId: number,
  date: Date,
}
