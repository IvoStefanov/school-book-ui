import { Component, Input } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { UserService } from '../user.service';
import { Grade } from '../enums/grade';
import { FormsModule, NgForm } from '@angular/forms';
import { Role } from '../login-page/user';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { LoginService } from '../login-page/login-page.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  @Input() schoolId: number;
  students: Student[];
  error = '';
  editStudentMode = false;
  createStudentMode = false;
  currentEditStudent: Student = null;
  userRole: string;

  constructor(
    private studentService: StudentService,
    private userService: UserService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.userRole = Role[this.loginService.user.value.role]
    this.getStudents();
  }

  public get currentStudentGrade(): string {
    return Grade[this.currentEditStudent.grade];
  }

  public get grades(): (string | Grade)[] {
    return Object.getOwnPropertyNames(Grade).filter(val => isNaN(parseInt(val)));
  }

  public getStudents(): void {
    this.studentService.getStudents(this.schoolId).subscribe(
      students => this.students = students
    );
  }

  public edit(student: Student): void {
    this.editStudentMode = true;
    this.currentEditStudent = student;
  }

  public delete(studentId: number): void {
    this.studentService.removeStudent(studentId).subscribe(() => this.getStudents());
  }

  public editStudentForm(form: NgForm, studentId: number): void {
    this.studentService.updateStudent(
      studentId,
      form.value.studentName,
      form.value.studentAddress,
      form.value.studentContact,
      parseInt(Grade[form.value.studentGrade]),
    ).subscribe({
      next: () => this.getStudents(),
      error: err => this.error = err
    })
    form.reset();
    this.editStudentMode = false;
  }

  public createStudentForm(form: NgForm): void {
    this.userService.createUser(
      Role.Student,
      form.value.studentUsername,
      form.value.studentPassword,
    ).pipe(
      switchMap((userId: number) => {
        if (!userId) {
          return of();
        }
        return this.studentService.createStudent(
          form.value.studentName,
          form.value.studentAddress,
          form.value.studentContact,
          parseInt(Grade[form.value.studentGrade]),
          this.schoolId,
          userId,
        )
      })
    ).subscribe({
      next: () => {
        this.getStudents()
        form.reset();
        this.createStudentMode = false;
      },
      error: err => this.error = err
    })
  }

  public cancelStudentCreation(): void {
    this.editStudentMode = false;
  }
}
