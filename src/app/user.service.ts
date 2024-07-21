import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './login-page/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  public createUser(role: Role, username: string, password: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<number>(
      'http://localhost:3000/create-school',
      {role: role, username: username, password: password},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
