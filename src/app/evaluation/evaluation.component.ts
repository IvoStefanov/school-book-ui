import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Student } from '../student/student';
import { EvaluationService } from './evaluation.service';
import { SchoolSubject } from '../enums/subjects';
import { Grade } from '../enums/grade';

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

  constructor(
    private evaluationService: EvaluationService,
  ) { }

  ngOnInit(): void {
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

  public get subjects(): (string | SchoolSubject)[] {
    return Object.getOwnPropertyNames(SchoolSubject).filter(val => isNaN(parseInt(val)));
  }


  // public editScheduleForm(form: NgForm, scheduleId: number): void {
  //   this.scheduleService.updateSchedule(
  //     scheduleId,
  //     parseInt(Grade[form.value.scheduleGrade]),
  //     parseInt(form.value.scheduleTeacherId),
  //     parseInt(Date[form.value.scheduleDate]),
  //   ).subscribe({
  //     next: () => this.getSchedules(),
  //     error: err => this.error = err
  //   })
  //   form.reset();
  //   this.editScheduleMode = false;
  // }

  public createEvaluationForm(form: NgForm): void {
    // this.marks.push(parseInt(form.value.evaluationMark));
    this.evaluationService.createEvaluation(
      this.student.id,
      this.subject,
      this.marks,
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
    // this.marks = new Array(form.value.editEvaluationMark.split(' '));
    this.evaluationService.updateEvaluation(
      this.student.id,
      this.subject,
      this.marks,
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
