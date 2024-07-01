import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { School } from './school';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  http: any;

  constructor() { }

  public getSchools(): Observable<School[]> {
    return this.http.get(
       'http://localhost:3000/schools'
     ).pipe(
      //  catchError(this.handleError),
       map((res: School) => {
        let school: School = { id: res.id, name: res.name, address: res.address, contact: res.contact};
        return school;
      })
     )
  }

  public createSchool(name: string, address: string, contact: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/create-school',
      {name: name, address: address, contact: contact}
    ).pipe(
      // catchError(this.handleError),
      map(res => {
        console.log(res)
      })
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
