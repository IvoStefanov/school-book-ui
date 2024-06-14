import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './login-page/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginPageComponent},
    { path:'home', component: HomePageComponent, canActivate: [AuthGuard]}
];
