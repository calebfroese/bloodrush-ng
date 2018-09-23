import { Action } from '@ngrx/store';

export enum TeamActionTypes {
  LoadTeams = '[Team] Load Teams'
}

export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LoadTeams;
}

export type TeamActions = LoadTeams;
