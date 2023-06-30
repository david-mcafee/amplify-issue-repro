import { TestBed } from '@angular/core/testing';

import { AppsyncService } from './appsync.service';

describe('AppsyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppsyncService = TestBed.get(AppsyncService);
    expect(service).toBeTruthy();
  });
});
