import { Component } from '@angular/core';
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
export class SchoolsComponent {
  public error = '';
  public schools: School[];
  public createMode = true;

  constructor(public schoolsService: SchoolsService, public router: Router) {}

  public ngOnInit(): void {
    this.schoolsService.getSchools().subscribe(
      schools => this.schools = schools
    );
  }

  public createSchool(form: NgForm): void {
    this.schoolsService.createSchool(form.value.name, form.value.address, form.value.contact).subscribe({
      next: res => console.log(res),
      error: err => this.error = err
    })
    form.reset();
    this.createMode = false;
  }

  public cancelCreation(): void {
    this.createMode = false;
  }
}
