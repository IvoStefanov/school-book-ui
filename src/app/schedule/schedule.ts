import { Date } from "../enums/date";
import { Grade } from "../enums/grade";
import { Teacher } from "../teacher/teacher";

export interface Schedule {
  id: number,
  schoolId: number,
  grade: Grade,
  teacher: Teacher,
  date: Date,
}
