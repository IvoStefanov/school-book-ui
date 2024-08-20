import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../student/student';
import { SchoolSubject } from '../enums/subjects';
import { AbsenceService } from './absence.service';
import { FormsModule, NgForm } from '@angular/forms';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.css'
})
export class AbsenceComponent implements OnInit {
  @Input() student: Student;
  @Input() subject: SchoolSubject;
  absences: string[] = new Array();
  error = '';
  editAbsenceMode = false;
  createAbsenceMode = false;

  constructor(
    private absenceService: AbsenceService,
  ) { }

  ngOnInit(): void {
    this.absenceService.getStudentAbsences(
      this.student.id,
      this.subject
    ).subscribe((absences: string[]) => {
      if (!absences) {
        this.absences = new Array()
      } else {
        this.absences = absences
      }
    })
  }

  public createAbsenceForm(form: NgForm): void {
    const newAbsence = form.value.absence as string

    if(!new RegExp('[0-9]{2}/[0-9]{2}/[0-9]{4}').test(newAbsence)) {
      return;
    }

    this.absenceService.createAbsence(
      this.student,
      this.subject,
      newAbsence,
    ).pipe(
      switchMap(() => this.absenceService.getStudentAbsences(
        this.student.id,
        this.subject
      ))
    ).subscribe({
      next: (absences) => {
        this.absences = absences;
        form.reset();
        this.createAbsenceMode = false;
      },
      error: err => this.error = err
    })
  }

  public deleteAbsence(absence: string): void {
    this.absenceService.deleteAbsence(
      this.student.id,
      this.subject,
      absence,
    ).pipe(
      switchMap(() => this.absenceService.getStudentAbsences(
        this.student.id,
        this.subject
      ))
    ).subscribe({
      next: (absences) => {
        this.absences = absences;
      },
      error: err => this.error = err
    })
  }
}
