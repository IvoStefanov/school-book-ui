import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from "rxjs";
import { User } from "./user";

@Injectable()
export class LoginService {
  public user = new BehaviorSubject<User>(null as any);
  constructor(private http: HttpClient) {}


  public login(username: string, password: string): Observable<object> {
     return this.http.post<{access_token: string}>(
        'http://localhost:3000/auth/login',
        {username: username, password: password}
      ).pipe(
        catchError(this.handleError),
        switchMap((value: {access_token: string}) => {
          return this.http.post('http://localhost:3000/profile', {
            headers: {
              'Authorization': 'bearer ' + value.access_token
            }
          })
        }),
        // map(res => this.user.next(res))
      )
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let message = 'An unknown error occured!';
    if(!error.error || !error.error.error) {
      return throwError(() => message);
    }
    // switch(error.error.error.message) {
    //   case 'EMIAL_EXISTS': message = "This email already exists!"; break;
    //   case 'EMIAL_NOT_FOUND': message = "Invalid email or password!"; break;
    //   case 'INVALID_PASSWORD': message = "Invalid email or password!"; break;
    // }
    return throwError(() => message);
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
