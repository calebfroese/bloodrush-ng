import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [AuthenticationGuard],
    });
  });

  it('should ...', inject(
    [AuthenticationGuard],
    (guard: AuthenticationGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
