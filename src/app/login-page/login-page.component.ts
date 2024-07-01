import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login-page.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { User } from './user';

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

  constructor(public loginService: LoginService, public router: Router) {}

  public ngOnInit(): void {
      this.loginService.autoLogin();
  }

  public login(form: NgForm): void{
    this.loginService.login(form.value.username, form.value.password).subscribe(res => { 
    this.user = res;
    // save token to local storage here??
    this.router.navigate(['/home/admin']);
    },
      error => this.error = error);
    form.reset();
  }
}
