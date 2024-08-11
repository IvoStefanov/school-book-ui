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
       `http://localhost:3000/evaluation?student=${studentId}&subject=${subject}`,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  createEvaluation(studentId: number, subject: SchoolSubject, marks: number []): Observable<number[]> {
    console.log(marks)
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<number[]>(
      'http://localhost:3000/create-evaluation',
      {studentId: studentId, subject: subject, marks: marks},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  updateEvaluation(studentId: number, subject: SchoolSubject, marks: number []): Observable<number[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<number[]>(
      'http://localhost:3000/update-evaluation',
      {studentId: studentId, subject: subject, marks: marks},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
