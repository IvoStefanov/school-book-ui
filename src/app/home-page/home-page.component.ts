import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public username = '';

  constructor(private loginService: LoginService) {}

  public ngOnInit(): void {
      this.loginService.user.subscribe(user => {
        this.username = user.username;
        // console.log(user)
      });
  }

}
