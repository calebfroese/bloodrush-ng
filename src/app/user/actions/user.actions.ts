import { Action } from '@ngrx/store';
import { ISignUpResult } from 'amazon-cognito-identity-js';

export enum UserActionTypes {
  SignUp = '[User] Sign Up',
  SignUpSuccess = '[User] Sign Up Success',
  SignUpError = '[User] Sign Up Error',
}

export class SignUp implements Action {
  readonly type = UserActionTypes.SignUp;
  constructor(public payload: { email: string; password: string }) {}
}
export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SignUpSuccess;
  constructor(public payload: ISignUpResult) {}
}
export class SignUpError implements Action {
  readonly type = UserActionTypes.SignUpError;
  constructor(public payload: Error) {}
}

export type UserActions = SignUp | SignUpSuccess | SignUpError;
