import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, ActivatedRoute, Params } from '@angular/router';
import { SchoolSubject } from '../enums/subjects';
import { UserService } from '../user.service';
import { Teacher } from './teacher';
import { TeacherService } from './teacher.service';
import { switchMap, of } from 'rxjs';
import { Role } from '../login-page/user';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit {
  @Input() schoolId: number;
  teachers: Teacher[];
  error = '';
  editTeacherMode = false;
  createTeacherMode = false;
  currentEditTeacher: Teacher = null;

  constructor(
    private teacherService: TeacherService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  public get currentTeacherSubject(): string {
    return SchoolSubject[this.currentEditTeacher.subject];
  }

  public get subjects(): (string | SchoolSubject)[] {
    return Object.getOwnPropertyNames(SchoolSubject).filter(val => isNaN(parseInt(val)));
  }

  public getTeachers(): void {
    this.teacherService.getTeachers(this.schoolId).subscribe(
      teachers => this.teachers = teachers
    );
  }

  public edit(teacher: Teacher): void {
    this.editTeacherMode = true;
    this.currentEditTeacher = teacher;
  }

  public delete(teacherId: number): void {
    this.teacherService.removeTeacher(teacherId).subscribe(() => this.getTeachers());
  }

  public editTeacherForm(form: NgForm, teacherId: number): void {
    this.teacherService.updateTeacher(
      teacherId,
      form.value.teacherName,
      form.value.teacherAddress,
      form.value.teacherContact,
      parseInt(SchoolSubject[form.value.teacherSubject]),
    ).subscribe({
      next: () => this.getTeachers(),
      error: err => this.error = err
    })
    form.reset();
    this.editTeacherMode = false;
  }

  public createTeacherForm(form: NgForm): void {
    this.userService.createUser(
      Role.Teacher,
      form.value.teacherUsername,
      form.value.teacherPassword,
    ).pipe(
      switchMap((userId: number) => {
        if (!userId) {
          return of();
        }
        return this.teacherService.createTeacher(
          form.value.teacherName,
          form.value.teacherAddress,
          form.value.teacherContact,
          parseInt(SchoolSubject[form.value.teacherSubject]),
          this.schoolId,
          userId,
        )
      })
    ).subscribe({
      next: () => {
        this.getTeachers()
        form.reset();
        this.createTeacherMode = false;
      },
      error: err => this.error = err
    })
  }

  public cancelTeacherCreation(): void {
    this.editTeacherMode = false;
  }
}
