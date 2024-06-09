import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}


  public login(username: string, password: string): Observable<object> {
    return this.http.post('http://localhost:3000/auth/login', {usersname: username, password: password});
  }

}

 // fetch('http://localhost:3000/auth/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: '{"username": "admin", "password": "admin"}'
  // });

  // fetch('http://localhost:3000/profile', {
  //   headers: {
  //     'Authorization': 'bearer ...'
  //   }
  // });
