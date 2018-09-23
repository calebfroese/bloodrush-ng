import { TestBed } from '@angular/core/testing';

import { AppSyncService } from './app-sync.service';

describe('AppSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppSyncService = TestBed.get(AppSyncService);
    expect(service).toBeTruthy();
  });
});
