import { Component, Input } from '@angular/core';
import { SchoolsComponent } from '../schools/schools.component';
import { User } from '../login-page/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SchoolsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
}
