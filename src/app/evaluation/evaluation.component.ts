import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Evaluation } from './evaluation';
import { Student } from '../student/student';
import { EvaluationService } from './evaluation.service';
import { TeacherService } from '../teacher/teacher.service';
import { UserService } from '../user.service';
import { StudentService } from '../student/student.service';
import { SchoolSubject } from '../enums/subjects';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit {
  @Input() schoolId: number;
  evaluations: Evaluation[];
  error = '';
  editEvaluationMode = false;
  createEvaluationMode = false;
  currentEditEvaluation: Evaluation = null;
  students: Student[] = [];

  constructor(
    private evaluationService: EvaluationService,
    private userService: UserService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getEvaluations();
    this.getStudents();
  }

  public get currentScheduleSubject(): string {
    return SchoolSubject[this.currentEditEvaluation.subject];
  }

  public get subjects(): (string | SchoolSubject)[] {
    return Object.getOwnPropertyNames(SchoolSubject).filter(val => isNaN(parseInt(val)));
  }

  public getStudents(): void {
    this.studentService.getStudentsByGrade(this.schoolId).subscribe(students => this.students = students)
  }
}
