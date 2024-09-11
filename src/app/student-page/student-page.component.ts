import { Component, OnInit } from '@angular/core';
import { SchoolSubject } from '../enums/subjects';
import { Grade } from '../enums/grade';
import { Date } from '../enums/date';
import { Student } from '../student/student';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { switchMap, of, zip } from 'rxjs';
import { Teacher } from '../teacher/teacher';
import { Schedule } from '../schedule/schedule';
import { ScheduleService } from '../schedule/schedule.service';
import { StudentService } from '../student/student.service';
import { isEmpty } from 'lodash';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AbsenceComponent } from '../absence/absence.component';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { ParentComponent } from "../parent/parent.component";
import { Role } from '../login-page/user';
import { LoginService } from '../login-page/login-page.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AbsenceComponent, EvaluationComponent, RouterLink, ParentComponent, HeaderComponent],
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css','/src/styles.css']
})
export class StudentPageComponent implements OnInit {
  student: Student;
  schedules: Schedule[];
  error = '';
  userRole: string;

  constructor(
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userRole = Role[this.loginService.user.value.role]

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (isEmpty(params)) {
          return of();
        }
        return this.studentService.getStudent(params["id"]);
      }),
      switchMap((student: Student | undefined) => {
        if(!student) {
          return of();
        }
        this.student = student;
        return this.scheduleService.getSchedulesByGrade(student.grade);
      })
    ).subscribe({
      next: schedule => {
        this.schedules = schedule;
      },
      error: () => this.error = "Student page error!"
    })
  }

  public getSubject(teacher: Teacher): string | SchoolSubject {
    return this.subjects[teacher.subject];
  }

  public checkValidSubject(subject: string): boolean {
    return this.schedules.filter(schedule => schedule.teacher.subject === this.schoolSubject(subject)).length > 0;
  }

  public get grades(): (string | Grade)[] {
    return Object.getOwnPropertyNames(Grade).filter(val => isNaN(parseInt(val)));
  }

  public get dates(): (string | Date)[] {
    return Object.getOwnPropertyNames(Date).filter(val => isNaN(parseInt(val)));
  }

  public get subjects(): string[] {
    return Object.getOwnPropertyNames(SchoolSubject).filter(val => isNaN(parseInt(val)));
  }

  public schoolSubject(subject: string): SchoolSubject {
    return SchoolSubject[subject as keyof typeof SchoolSubject];
  }
}
