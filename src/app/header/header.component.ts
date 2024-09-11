import { Component } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { Role } from '../login-page/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public username = '';

  constructor(public loginService: LoginService) {}

  public logout(): void {
    this.loginService.logout();
  }

  public get role(): typeof Role {
    return Role;
  }
}
