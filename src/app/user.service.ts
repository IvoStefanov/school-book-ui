import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './login-page/user';
import { Observable } from 'rxjs';
import { Principle } from './school/principle';
import { Teacher } from './teacher/teacher';
import { Student } from './student/student';
import { Parent } from './parent/parent';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  public createUser(role: Role, username: string, password: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<number>(
      'http://localhost:3000/create-user',
      {role: role, username: username, password: password},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getPrincipalByUser(userId: number): Observable<Principle> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Principle>(
       'http://localhost:3000/principle-by-user?user=' + userId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getTeacherByUser(userId: number): Observable<Teacher> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Teacher>(
       'http://localhost:3000/teacher-by-user?user=' + userId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getStudentByUser(userId: number): Observable<Student> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Student>(
       'http://localhost:3000/student-by-user?user=' + userId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getParentByUser(userId: number): Observable<Parent> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Parent>(
       'http://localhost:3000/parent-by-user?user=' + userId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
