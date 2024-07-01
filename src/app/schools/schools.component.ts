import { Component } from '@angular/core';
import { School } from './school';
import { SchoolsService } from './schools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.css'
})
export class SchoolsComponent {
  public error = '';
  public schools: School[];

  constructor(public schoolsService: SchoolsService, public router: Router) {}

  public ngOnInit(): void {
    this.schoolsService.getSchools().subscribe(
      schools => this.schools = schools
    );
  }
}
