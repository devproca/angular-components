import { TestBed } from '@angular/core/testing';

import { SlideToggleService } from './slide-toggle.service';

describe('SlideToggleService', () => {
  let service: SlideToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
