import { TestBed } from '@angular/core/testing';

import { AddHotelsService } from './add-hotels.service';

describe('AddHotelsService', () => {
  let service: AddHotelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddHotelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
