import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';
import { Grade } from '../enums/grade';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getStudents(schoolId: number): Observable<Student[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Student[]>(
       'http://localhost:3000/students?school=' + schoolId,
       {headers: {"Authorization": "Bearer " + token}}
    )
    // .pipe(
    // //  catchError(this.handleError),
    //   switchMap(res =>
    //     res.map(school => {
    //       id: school.id;
    //       name: school.name;
    //       address: school.address;
    //       contact: school.contact
    //     })
    //   )
    // )
  }

  public getStudentsByGrade(grade: Grade): Observable<Student[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Student[]>(
       'http://localhost:3000/students?grade=' + grade,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(
       'http://localhost:3000/student?id=' + id,
    )
  }

  public createStudent(name: string, address: string, contact: string, grade: Grade, schoolId: number, userId: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-student',
      {name: name, address: address, contact: contact, grade: grade, schoolId: schoolId, userId: userId},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateStudent(id: number, name: string, address: string, contact: string, grade: Grade) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-student',
      {id: id, name: name, address: address, contact: contact, grade: grade},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateStudentParent(id: number, parentId: number): Observable<Student> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<Student>(
      'http://localhost:3000/update-student-parent',
      {id: id, parentId: parentId},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeStudent(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-student',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
