import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Schedule } from './schedule';
import { ScheduleService } from './schedule.service';
import { UserService } from '../user.service';
import { Grade } from '../enums/grade';
import { Date } from '../enums/date';
import { Teacher } from '../teacher/teacher';
import { TeacherService } from '../teacher/teacher.service';
import { SchoolSubject } from '../enums/subjects';
import { LoginService } from '../login-page/login-page.service';
import { Role } from '../login-page/user';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css', '/src/styles.css']
})
export class ScheduleComponent implements OnInit {
  @Input() schoolId: number;
  schedules: Schedule[];
  error = '';
  editScheduleMode = false;
  createScheduleMode = false;
  currentEditSchedule: Schedule = null;
  teachers: Teacher[] = [];
  userRole: string;

  constructor(
    private scheduleService: ScheduleService,
    private teacherService: TeacherService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.userRole = Role[this.loginService.user.value.role]
    this.getSchedules();
    this.getTeachers();
  }

  public get currentScheduleGrade(): string {
    return Grade[this.currentEditSchedule.grade];
  }

  public get currentScheduleDate(): string {
    return Date[this.currentEditSchedule.date];
  }

  public getTeachers(): void {
    this.teacherService.getTeachers(this.schoolId)
    .subscribe(teachers => {
      this.teachers = teachers
    }
    );
  }

  public transformSubjectEnum(subject:  SchoolSubject): string {
    return SchoolSubject[subject];
  }

  public get grades(): (string | Grade)[] {
    return Object.getOwnPropertyNames(Grade).filter(val => isNaN(parseInt(val)));
  }

  public get dates(): (string | Date)[] {
    return Object.getOwnPropertyNames(Date).filter(val => isNaN(parseInt(val)));
  }

  public getSchedules(): void {
    this.scheduleService.getSchedules(this.schoolId).subscribe(
      schedules => this.schedules = schedules
    );
  }

  public edit(schedule: Schedule): void {
    this.editScheduleMode = true;
    this.currentEditSchedule = schedule;
  }

  public delete(scheduleId: number): void {
    this.scheduleService.removeSchedule(scheduleId).subscribe(() => this.getSchedules());
  }

  public editScheduleForm(form: NgForm, scheduleId: number): void {
    this.scheduleService.updateSchedule(
      scheduleId,
      parseInt(Grade[form.value.scheduleGrade]),
      parseInt(form.value.scheduleTeacherId),
      parseInt(Date[form.value.scheduleDate]),
    ).subscribe({
      next: () => this.getSchedules(),
      error: err => this.error = err
    })
    form.reset();
    this.editScheduleMode = false;
  }

  public createScheduleForm(form: NgForm): void {
    this.scheduleService.createSchedule(
      this.schoolId,
      parseInt(Grade[form.value.scheduleGrade]),
      parseInt(form.value.scheduleTeacherId),
      parseInt(Date[form.value.scheduleDate]),
    ).subscribe({
      next: () => {
        this.getSchedules()
        form.reset();
        this.createScheduleMode = false;
      },
      error: err => this.error = err
    })
  }

  public cancelScheduleCreation(): void {
    this.editScheduleMode = false;
  }
}
