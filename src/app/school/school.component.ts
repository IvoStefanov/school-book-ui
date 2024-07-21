import { Component, OnInit } from '@angular/core';
import { School } from './school';
import { SchoolsService } from '../schools/schools.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isEmpty } from 'lodash';
import { CommonModule } from '@angular/common';
import { Principle } from './principle';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Role } from '../login-page/user';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})
export class SchoolComponent implements OnInit{
  school: School;
  principle: Principle;
  error = '';

  constructor(
    private schoolsService: SchoolsService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (isEmpty(params)) {
          return of();
        }
        return this.schoolsService.getSchool(params["name"])
      }),
      switchMap((school: School | undefined) => {
        if(!school) {
          return of();
        }
        this.school = school;
        return this.schoolsService.getPrincipleBySchool(this.school.id)
      })
    ).subscribe({
      next: principle => this.principle = principle,
      error: () => this.error = "No principle set yet!"
    })
  }

  public createPrinciple(form: NgForm): void {
    this.userService.createUser(
      Role.Principal,
      form.value.principleUsername,
      form.value.principlePassword,
    ).pipe(
      switchMap((userId: number) => {
        if (!userId) {
          return of();
        }
        return this.schoolsService.createPrinciple(
          this.school.id,
          userId,
          form.value.principleName,
          form.value.principleAddress,
          form.value.principleContact,
        )
      })
    ).subscribe({
      next: (principle: Principle) => this.principle = principle,
      error: err => this.error = err
    })
    form.reset();
  }
}
