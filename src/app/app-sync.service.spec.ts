import { TestBed } from '@angular/core/testing';

import { AppSyncService } from './app-sync.service';
import { LoginService } from './login.service';

describe('AppSyncService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useValue: {} }, AppSyncService],
    }));

  it('should be created', () => {
    const service: AppSyncService = TestBed.get(AppSyncService);
    expect(service).toBeTruthy();
  });
});
