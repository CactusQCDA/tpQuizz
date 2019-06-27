import { TestBed } from '@angular/core/testing';

import { QuizzserviceService } from './quizzservice.service';

describe('QuizzserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizzserviceService = TestBed.get(QuizzserviceService);
    expect(service).toBeTruthy();
  });
});
