import { Action } from '@ngrx/store';

export enum TeamActionTypes {
  FetchTeams = '[Team] Fetch Teams',
  LoadTeams = '[Team] Load Teams',
}

export class FetchTeams implements Action {
  readonly type = TeamActionTypes.FetchTeams;
}
export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LoadTeams;
  constructor(public payload: Team[]) {}
}

export type TeamActions = FetchTeams | LoadTeams;
