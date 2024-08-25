import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../parent/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }

  public getParent(id: number): Observable<Parent> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Parent>(
       'http://localhost:3000/parent?id=' + id,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getAllParents(schoolId: number): Observable<Parent[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Parent[]>(
       'http://localhost:3000/parents?schoolId=' + schoolId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public createParent(userId: number, schoolId: number, name: string, address: string, contact: string): Observable<Parent> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<Parent>(
      'http://localhost:3000/create-parent',
      {userId: userId, schoolId: schoolId, name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateParent(userId: number, name: string, address: string, contact: string): Observable<Parent> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post<Parent>(
      'http://localhost:3000/update-parent',
      {userId: userId, name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
