import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  @ViewChild('selectParentMenu') selectedParent: ElementRef;
  parent: Parent;
  parents: Parent[];
  userRole: string;

  error = '';
  editParentMode = false;
  createParentMode = false;
  currentEditParent: Parent;

  constructor(
    private parentService: ParentService,
    private studentService: StudentService,
    private loginService: LoginService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userRole = Role[this.loginService.user.value.role]
    if (this.student.parent) {
      this.parent = this.student.parent;
    } else {
      this.getAllParents();
    }
  }

  getAllParents(): void {
    this.parentService.getAllParents(this.student.school.id).subscribe(parents => this.parents = parents);
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
        this.createParentMode = false;
      },
      error: err => this.error = err
    })
  }

  selectParent(): void  {
    if (!this.selectedParent.nativeElement.value){
      return;
    }
    const parentId = parseInt(this.selectedParent.nativeElement.value);
    
    this.studentService.updateStudentParent(
      this.student.id,
      parentId,
    ).pipe(
      switchMap(student => this.parentService.getParent(student.parent.id))
    ).subscribe({
      next: parent => this.parent = parent,
      error: err => this.error = err
    })
  }

  editParent() {
    this.editParentMode = true;
    this.currentEditParent = this.parent;
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
