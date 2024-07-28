import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { Observable } from 'rxjs';
import { SchoolSubject } from '../enums/subjects';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }


  public getTeachers(): Observable<Teacher[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Teacher[]>(
       'http://localhost:3000/teachers',
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

  public getTeacher(name: string): Observable<Teacher> {
    return this.http.get<Teacher>(
       'http://localhost:3000/teacher?name=' + name,
    )
  }

  public createTeacher(name: string, address: string, contact: string, subject: SchoolSubject, schoolId: number, userId: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-teacher',
      {name: name, address: address, contact: contact, subject: subject, schoolId: schoolId, userId: userId},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateTeacher(id: number, name: string, address: string, contact: string, subject: SchoolSubject) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-school',
      {id: id, name: name, address: address, contact: contact, subject: subject},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeTeacher(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-teacher',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }


}
