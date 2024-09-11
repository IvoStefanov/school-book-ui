import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../teacher/teacher.service';
import { UserService } from '../user.service';
import { Teacher } from '../teacher/teacher';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { isEmpty } from 'lodash';
import { ScheduleService } from '../schedule/schedule.service';
import { Schedule } from '../schedule/schedule';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student';
import { Grade } from '../enums/grade';
import { ScheduleComponent } from "../schedule/schedule.component";
import { StudentComponent } from "../student/student.component";
import { Date } from '../enums/date';
import { SchoolSubject } from '../enums/subjects';
import { EvaluationComponent } from "../evaluation/evaluation.component";
import { AbsenceComponent } from "../absence/absence.component";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ScheduleComponent, StudentComponent, EvaluationComponent, AbsenceComponent, RouterLink, HeaderComponent],
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css', '/src/styles.css']
})
export class TeacherProfileComponent implements OnInit {
  teacher: Teacher;
  schedules: Schedule[] = [];
  studentGrades: Map<Grade, Student[]> = new Map();
  error = '';
  editTeacherMode = false;
  createTeacherMode = false;
  currentEditTeacher: Teacher = null;

  constructor(
    private teacherService: TeacherService,
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (isEmpty(params)) {
          return of();
        }
        return this.teacherService.getTeacher(params["id"])
      }),
      switchMap((teacher: Teacher | undefined) => {
        if(!teacher) {
          return of();
        }
        this.teacher = teacher;
        return this.scheduleService.getSchedulesByTeacher(teacher.id)
      })
    ).subscribe({
      next: schedules => {
        this.schedules = schedules;
        this.getTeacherStudents(schedules);
      },
      error: () => this.error = "Teacher page error!"
    })
  }

  getTeacherStudents(schedules: Schedule[]): void {
    const grades = new Set<Grade>();

    schedules.forEach(schedule => {
      grades.add(schedule.grade)
    });

    grades.forEach(grade => {
      this.studentService.getStudentsByGrade(grade)
        .subscribe(students => {
          this.studentGrades.set(grade, students);
        });
    });
  }

  public get grades(): (string | Grade)[] {
    return Object.getOwnPropertyNames(Grade).filter(val => isNaN(parseInt(val)));
  }

  public get dates(): (string | Date)[] {
    return Object.getOwnPropertyNames(Date).filter(val => isNaN(parseInt(val)));
  }

  public get subjects(): (string | SchoolSubject)[] {
    return Object.getOwnPropertyNames(SchoolSubject).filter(val => isNaN(parseInt(val)));
  }
}
