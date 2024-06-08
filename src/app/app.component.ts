import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-book-ui';

  // fetch('http://localhost:3000/auth/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: '{"username": "admin", "password": "admin"}'
  // });

  // fetch('http://localhost:3000/profile', {
  //   headers: {
  //     'Authorization': 'bearer ...'
  //   }
  // });
}
