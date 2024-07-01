import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { SchoolsComponent } from '../schools/schools.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HomePageComponent, SchoolsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
