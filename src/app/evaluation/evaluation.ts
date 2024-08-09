import { SchoolSubject } from "../enums/subjects";

export interface Evaluation {
  id: number,
  mark: number,
  studentId: number,
  subject: SchoolSubject
}
