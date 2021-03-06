import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TeamEffects } from './team.effects';
import { AppSyncService } from '../app-sync.service';

describe('TeamEffects', () => {
  let actions$: Observable<any>;
  let effects: TeamEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamEffects,
        AppSyncService,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(TeamEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
