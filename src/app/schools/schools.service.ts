import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
import { School } from './school';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../login-page/user';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http: HttpClient, private router: Router) {}

  public getSchools(): Observable<School[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<School[]>(
       'http://localhost:3000/schools',
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

  public createSchool(name: string, address: string, contact: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-school',
      {name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  // private handleError(error: HttpErrorResponse): Observable<any> {
    // let message = 'An unknown error occured!';
    // if(!error.error || !error.error.error) {
    //   return throwError(() => message);
    // }
    // // switch(error.error.error.message) {
    // //   case 'EMIAL_EXISTS': message = "This email already exists!"; break;
    // //   case 'EMIAL_NOT_FOUND': message = "Invalid email or password!"; break;
    // //   case 'INVALID_PASSWORD': message = "Invalid email or password!"; break;
    // // }
    // return throwError(() => message);
  // }
}
