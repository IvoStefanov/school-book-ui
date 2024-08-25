import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Student } from '../student/student';
import { EvaluationService } from './evaluation.service';
import { SchoolSubject } from '../enums/subjects';
import { switchMap } from 'rxjs';
import { LoginService } from '../login-page/login-page.service';
import { Role } from '../login-page/user';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit {
  @Input() student: Student;
  @Input() subject: SchoolSubject;
  marks: number[] = new Array();
  error = '';
  editEvaluationMode = false;
  createEvaluationMode = false;
  userRole: string;

  constructor(
    private evaluationService: EvaluationService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.userRole = Role[this.loginService.user.value.role]

    this.evaluationService.getStudentMarks(
      this.student.id,
      this.subject
    ).subscribe((marks: number[]) => {
      if (!marks) {
        this.marks = new Array()
      } else {
        this.marks = marks
      }
    })
  }

  public createEvaluationForm(form: NgForm): void {
    const newEvaluations = []
    for (let markStr of (form.value.evaluationMarks as string).split(' ')) {
      const mark =  parseInt(markStr)
      if(mark < 1 || mark > 6) {
        return;
      }
      newEvaluations.push(mark)
    }

    this.evaluationService.createEvaluation(
      this.student,
      this.subject,
      newEvaluations,
    ).pipe(
      switchMap(() => this.evaluationService.getStudentMarks(
        this.student.id,
        this.subject
      ))
    ).subscribe({
      next: (marks) => {
        this.marks = marks;
        form.reset();
        this.createEvaluationMode = false;
      },
      error: err => this.error = err
    })
  }

  public editEvaluationForm(form: NgForm): void {
    const newEvaluations = []
    for (let markStr of (form.value.evaluationMarks as string).split(' ')) {
      const mark =  parseInt(markStr)
      if(mark < 1 || mark > 6) {
        return;
      }
      newEvaluations.push(mark)
    }
    this.evaluationService.updateEvaluation(
      this.student,
      this.subject,
      newEvaluations,
    ).pipe(
      switchMap(() => this.evaluationService.getStudentMarks(
        this.student.id,
        this.subject
      ))
    ).subscribe({
      next: (marks) => {
        this.marks = marks;
        form.reset();
        this.editEvaluationMode = false;
      },
      error: err => this.error = err
    })
  }

  showMarks(): string {
    return this.marks.join(' ')
  }
}
