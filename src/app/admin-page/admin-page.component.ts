import { Component } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Role } from '../login-page/user';
import { HeaderComponent } from "../header/header.component";
import { SchoolsComponent } from '../schools/schools.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, SchoolsComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  public username = '';

  constructor(public loginService: LoginService) {}

  public get role(): typeof Role {
    return Role;
  }

}
