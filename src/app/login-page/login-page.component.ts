import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login-page.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, HomePageComponent],
  providers: [LoginService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public error = '';

  constructor(public loginService: LoginService, public router: Router) {}

  public login(form: NgForm): void{
    this.loginService.login(form.value.username, form.value.password).subscribe(res => { 
      console.log(res)
      this.router.navigate(['/home']);
    },
      error => this.error = error);
    form.reset();
  }
}
