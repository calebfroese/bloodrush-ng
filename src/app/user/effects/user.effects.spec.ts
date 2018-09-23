import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../material.module';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      providers: [UserEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
