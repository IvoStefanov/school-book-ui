import { Component, OnInit } from '@angular/core';
import { StudentComponent } from "../student/student.component";
import { StudentPageComponent } from "../student-page/student-page.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Parent } from '../parent/parent';
import { Student } from '../student/student';
import { ParentService } from './parent.service';
import { StudentService } from '../student/student.service';
import { isEmpty } from 'lodash';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-parent-profile',
  standalone: true,
  imports: [StudentComponent, StudentPageComponent, CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css', '/src/styles.css']
})
export class ParentProfileComponent implements OnInit {
  parent: Parent;
  children: Student[];
  error = '';

  constructor(
    private studentService: StudentService,
    private parentService: ParentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (isEmpty(params)) {
          return of();
        }
        return this.parentService.getParent(params["id"]);
      }),
      switchMap((parent: Parent | undefined) => {
        if(!parent) {
          return of();
        }
        this.parent = parent;
        return this.studentService.getStudentsByParent(this.parent.id);
      })
    ).subscribe({
      next: students => {
        this.children = students;
      },
      error: () => this.error = "Parent page error!"
    })
  }
}
