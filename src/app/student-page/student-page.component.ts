import { Component, OnInit } from '@angular/core';
import { SchoolSubject } from '../enums/subjects';
import { Grade } from '../enums/grade';
import { Date } from '../enums/date';
import { Student } from '../student/student';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { Teacher } from '../teacher/teacher';
import { Schedule } from '../schedule/schedule';
import { ScheduleService } from '../schedule/schedule.service';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';
import { UserService } from '../user.service';
import { isEmpty } from 'lodash';
import { EvaluationService } from '../evaluation/evaluation.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent implements OnInit {
  student: Student;
  weekSchedule: Schedule[];
  error = '';
  evaluation: Map<string, number[]> = new Map();

  constructor(
    private teacherService: TeacherService,
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (isEmpty(params)) {
          return of();
        }
        return this.studentService.getStudent(params["id"])
      }),
      switchMap((student: Student | undefined) => {
        if(!student) {
          return of();
        }
        this.student = student;
        return this.scheduleService.getSchedulesByGrade(student.grade)
      })
    ).subscribe({
      next: schedule => {
        this.weekSchedule = schedule;
      },
      error: () => this.error = "Student page error!"
    })
  }

  public getEvaluation(): void {
    this.subjects.forEach(subject => {
      this.evaluationService.getStudentMarks(this.student.id, subject as unknown as SchoolSubject).subscribe(marks => {
        if(marks) {
          if(this.evaluation.has(subject)) {
            let values = this.evaluation.get(subject);
            this.evaluation.set(subject, values.concat(marks))
          } else {
            this.evaluation.set(subject, marks)
          }
        }
      })
    })
  }

  public getSubject(teacher: Teacher): string | SchoolSubject {
    return this.subjects[teacher.subject];
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
}
