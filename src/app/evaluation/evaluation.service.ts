import { Injectable } from '@angular/core';
import { Student } from '../student/student';
import { SchoolSubject } from '../enums/subjects';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient, private router: Router) { }

  getStudentMarks(studentId: number, subject: SchoolSubject): Observable<number[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<number[]>(
       `http://localhost:3000/evaluation?studentId=${studentId}&subject=${subject}`,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  createEvaluation(student: Student, subject: SchoolSubject, marks: number []): Observable<void> {
    console.log(marks)
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<void>(
      'http://localhost:3000/create-evaluation',
      {student: student, subject: subject, marks: marks},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  updateEvaluation(student: Student, subject: SchoolSubject, marks: number []): Observable<void> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<void>(
      'http://localhost:3000/update-evaluation',
      {student: student, subject: subject, marks: marks},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
