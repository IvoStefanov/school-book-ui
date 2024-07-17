import { Component, OnChanges, OnInit } from '@angular/core';
import { School } from './school';
import { SchoolsService } from './schools.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.css'
})
export class SchoolsComponent implements OnInit {
  public error = '';
  public schools: School[];
  public createMode = false;
  public editMode = false;
  public currentEditSchool: School = null;

  constructor(public schoolsService: SchoolsService, public router: Router) {}


  public ngOnInit(): void {
    this.getSchools();
  }

  public getSchools(): void {
    this.schoolsService.getSchools().subscribe(
      schools => this.schools = schools
    );
  }

  public createSchool(form: NgForm): void {
    this.schoolsService.createSchool(form.value.schoolName, form.value.schoolAddress, form.value.schoolContact).subscribe({
      next: res => this.getSchools(),
      error: err => this.error = err
    })
    form.reset();
    this.createMode = false;
  }

  public editSchool(form: NgForm, schoolId: number): void {
    this.schoolsService.updateSchool(schoolId, form.value.schoolName, form.value.schoolAddress, form.value.schoolContact).subscribe({
      next: res => this.getSchools(),
      error: err => this.error = err
    })
    this.editMode = false;
  }

  public cancelCreation(): void {
    this.createMode = false;
  }

  public remove(id: number): void {
    this.schoolsService.removeSchool(id).subscribe(() => this.getSchools());
  }

  public edit(school: School): void {
    this.editMode = true;
    this.currentEditSchool = school;
  }
}
