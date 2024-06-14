import { Component } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public username = '';

  constructor(public loginService: LoginService) {}

  public logout(): void {
    this.loginService.logout();
  }

}
