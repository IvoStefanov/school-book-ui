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
}
