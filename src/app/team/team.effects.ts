import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as TeamActions from './team.actions';
import { TeamActionTypes } from './team.actions';
import { tap, switchMapTo, map, switchMap } from 'rxjs/operators';
import { TeamService } from '../user/team.service';

@Injectable()
export class TeamEffects {
  @Effect()
  fetchTeams$ = this.actions$.pipe(
    ofType<TeamActions.FetchTeams>(TeamActionTypes.FetchTeams),
    switchMapTo(this.teamService.getTeams()),
    map(teams => new TeamActions.LoadTeams(teams))
  );

  @Effect({ dispatch: false })
  createTeam$ = this.actions$.pipe(
    ofType<TeamActions.CreateTeam>(TeamActionTypes.CreateTeam),
    switchMap(action => this.teamService.createTeam(action.payload))
  );

  constructor(private actions$: Actions, public teamService: TeamService) {}
}
