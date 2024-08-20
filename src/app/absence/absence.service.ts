import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolSubject } from '../enums/subjects';
import { Observable } from 'rxjs';
import { Student } from '../student/student';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient, private router: Router) { }

  getStudentAbsences(studentId: number, subject: SchoolSubject): Observable<string[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<string[]>(
       `http://localhost:3000/absence?studentId=${studentId}&subject=${subject}`,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  createAbsence(student: Student, subject: SchoolSubject, absence: string): Observable<void> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<void>(
      'http://localhost:3000/create-absence',
      {student: student, subject: subject, absence: absence},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  deleteAbsence(studentId: number, subject: SchoolSubject, absence: string): Observable<void> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<void>(
      'http://localhost:3000/delete-absence',
      {studentId: studentId, subject: subject, absence: absence},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
