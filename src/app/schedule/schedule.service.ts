import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from './schedule';
import { Grade } from '../enums/grade';
import { Date } from '../enums/date';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  public getSchedules(schoolId: number): Observable<Schedule[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Schedule[]>(
       'http://localhost:3000/schedules?school=' + schoolId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getSchedulesByTeacher(teacherId: number): Observable<Schedule[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Schedule[]>(
       'http://localhost:3000/schedules?teacher=' + teacherId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getSchedulesByGrade(grade: Grade): Observable<Schedule[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Schedule[]>(
       'http://localhost:3000/schedules?grade=' + grade,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public createSchedule(schoolId: number, grade: Grade, teacherId: number, date: Date) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-schedule',
      {schoolId: schoolId, grade: grade, teacherId: teacherId, date: date},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateSchedule(id: number, grade: Grade, teacherId: number, date: Date) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-schedule',
      {id: id, grade: grade, teacherId: teacherId, date: date},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeSchedule(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-schedule',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

}
