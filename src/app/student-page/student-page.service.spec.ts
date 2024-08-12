import { TestBed } from '@angular/core/testing';

import { StudentPageService } from './student-page.service';

describe('StudentPageService', () => {
  let service: StudentPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
