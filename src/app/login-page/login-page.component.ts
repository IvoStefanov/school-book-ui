import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login-page.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [LoginService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(public loginService: LoginService) {}

  public login(form: NgForm): void{
    this.loginService.login(form.value.username, form.value.password).subscribe(res => console.log(res));
  }
}
