import { Action } from '@ngrx/store';

export enum TeamActionTypes {
  FetchTeams = '[Team] Fetch Teams',
  LoadTeams = '[Team] Load Teams',
  CreateTeam = '[Team] Create Team',
}

export class FetchTeams implements Action {
  readonly type = TeamActionTypes.FetchTeams;
}
export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LoadTeams;
  constructor(public payload: Team[]) {}
}
export class CreateTeam implements Action {
  readonly type = TeamActionTypes.CreateTeam;
  constructor(public payload: { name: string }) {}
}

export type TeamActions = FetchTeams | LoadTeams | CreateTeam;
