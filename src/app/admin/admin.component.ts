import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HomePageComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
