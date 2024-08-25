import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { Role } from '../login-page/user';
import { ParentService } from '../parent-profile/parent.service';
import { Parent } from './parent';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable, of, switchMap } from 'rxjs';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements OnInit{
  @Input() student: Student;
  parent: Parent;
  userRole: string;

  error = '';
  editParentMode: boolean;
  currentEditParent: Parent;

  constructor(
    private parentService: ParentService,
    private studentService: StudentService,
    private loginService: LoginService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userRole = Role[this.loginService.user.value.role]
    this.parentService.getParent(this.student.parentId).subscribe(parent => this.parent = parent)
  }

  getAllParents(): Observable<Parent[]> {
    return this.parentService.getAllParents()
  }

  createParent(form: NgForm) {
    this.userService.createUser(
      Role.Parent,
      form.value.parentUsername,
      form.value.parentPassword,
    ).pipe(
      switchMap((userId: number) => {
        if (!userId) {
          return of();
        }
        return this.parentService.createParent(
          userId,
          this.student.school.id,
          form.value.parentName,
          form.value.parentAddress,
          form.value.parentContact,
        )
      })
    ).subscribe({
      next: (parent: Parent) => {
        this.parent = parent
        form.reset();
      },
      error: err => this.error = err
    })
  }

  selectParent(parent: Parent): void  {
    this.studentService.updateStudentParent(
      this.student.id,
      parent.id,
    ).pipe(
      switchMap(student => this.parentService.getParent(student.parentId))
    ).subscribe({
      next: res => this.parent = parent,
      error: err => this.error = err
    })
    this.editParentMode = false;
  }

  editParent(parent: Parent) {
    this.editParentMode = true;
    this.currentEditParent = parent;
  }

  public editParentForm(form: NgForm): void {
    this.parentService.updateParent(
      this.parent.id,
      form.value.parentName,
      form.value.parentAddress,
      form.value.parentContact,
    ).subscribe({
      next: res => this.parent = res,
      error: err => this.error = err
    })
    form.reset();
    this.editParentMode = false;
  }
}
