import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login-page.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { Role, User } from './user';
import { UserService } from '../user.service';
import { switchMap } from 'rxjs';
import { SchoolsService } from '../schools/schools.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, HomePageComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  public error = '';
  public user: User;

  constructor(
    public loginService: LoginService,
    public router: Router,
    private userService: UserService,
    private schoolService: SchoolsService,
  ) {}

  public ngOnInit(): void {
      this.loginService.autoLogin();
  }

  public login(form: NgForm): void{
    this.loginService.login(form.value.username, form.value.password).subscribe(res => {
      this.user = res;
      switch(this.user.role) {
        case Role.Admin: {
          this.router.navigate(['/home']);
          break;
        }
        case Role.Principle: {
          this.userService.getPrincipalByUser(this.user.id).subscribe(principle => this.router.navigate(['school/' + principle.school.name]))
          break;
        }
        case Role.Teacher: {
          this.userService.getTeacherByUser(this.user.id).subscribe(teacher => this.router.navigate(['teacher-profile/' + teacher.id]))
          break;
        }
        case Role.Student: {
          this.userService.getStudentByUser(this.user.id).subscribe(student => this.router.navigate(['student-page/' + student.id]))
          break;
        }
        case Role.Parent: {
          //statements;
          break;
        }
        default: {
          this.router.navigate(['']);
          break;
        }
    }
    },
      error => this.error = error);
    form.reset();
  }
}
