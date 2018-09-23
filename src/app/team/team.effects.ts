import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TeamActionTypes } from './team.actions';

@Injectable()
export class TeamEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(TeamActionTypes.LoadTeams));

  constructor(private actions$: Actions) {}
}
