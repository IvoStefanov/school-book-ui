import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './login-page/auth.guard';
import { SchoolComponent } from './school/school.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { StudentPageComponent } from './student-page/student-page.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent},
    { path:'home', component: HomePageComponent, canActivate: [AuthGuard]},
    { path: 'school/:name', component: SchoolComponent, canActivate: [AuthGuard]},
    { path: 'teacher-profile/:id', component: TeacherProfileComponent, canActivate: [AuthGuard]},
    { path: 'student-page/:id', component: StudentPageComponent, canActivate: [AuthGuard]},
];
