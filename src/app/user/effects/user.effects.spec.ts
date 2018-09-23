import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [UserEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
