import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
import { School } from '../school/school';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../login-page/user';
import { Principle } from '../school/principle';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http: HttpClient, private router: Router) {}

  public getSchoolById(id: number): Observable<School> {
    return this.http.get<School>(
       'http://localhost:3000/school-by-id?id=' + id,
    )
  }

  public getSchool(name: string): Observable<School> {
    return this.http.get<School>(
       'http://localhost:3000/school?name=' + name,
    )
  }

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

  public updateSchool(id: number, name: string, address: string, contact: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-school',
      {id: id, name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeSchool(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-school',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getPrincipleBySchool(schoolId: number): Observable<Principle> {
    return this.http.get<Principle>(
       'http://localhost:3000/principle-by-school?school=' + schoolId,
    )
  }

  public createPrinciple(
    schoolId: number,
    userId: number,
    name: string,
    address: string,
    contact: string,
  ) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<Principle>(
      'http://localhost:3000/create-principle',
      {
        schoolId: schoolId,
        userId: userId,
        name: name,
        address: address,
        contact: contact,
      },
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updatePrinciple(schoolId: number, name: string, address: string, contact: string): Observable<Principle> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<Principle>(
      'http://localhost:3000/update-principle',
      {id: schoolId, name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removePrinciple(schoolId: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-principle',
      {id: schoolId},
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
