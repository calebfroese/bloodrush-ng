import { Action } from '@ngrx/store';
import { CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';

export enum UserActionTypes {
  Login = '[User] Login',
  LoginSuccess = '[User] Login Success',
  SignUp = '[User] Sign Up',
  SignUpSuccess = '[User] Sign Up Success',
  UserError = '[User] Error',
  ResendVerification = '[User] Resend Verification',
  Verify = '[User] Verify',
  VerifySuccess = '[User] Verify Success',
  Logout = '[User] Logout',
  ForgotPassword = '[User] Forgot Password',
  ForgotPasswordSuccess = '[User] Forgot Password Success',
  ForgotPasswordConfirm = '[User] Forgot Password Confirm',
}

export class Login implements Action {
  readonly type = UserActionTypes.Login;
  constructor(public payload: { email: string; password: string }) {}
}
export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LoginSuccess;
  constructor(public payload: CognitoUserSession) {}
}
export class SignUp implements Action {
  readonly type = UserActionTypes.SignUp;
  constructor(public payload: { email: string; password: string }) {}
}
export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SignUpSuccess;
  constructor(public payload: ISignUpResult) {}
}
export class Verify implements Action {
  readonly type = UserActionTypes.Verify;
  constructor(public payload: { email: string; code: string }) {}
}
export class VerifySuccess implements Action {
  readonly type = UserActionTypes.VerifySuccess;
  constructor(public payload: any) {}
}
export class UserError implements Action {
  readonly type = UserActionTypes.UserError;
  constructor(public payload: Error) {}
}
export class ResendVerification implements Action {
  readonly type = UserActionTypes.ResendVerification;
  constructor(public payload: string) {}
}
export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}
export class ForgotPassword implements Action {
  readonly type = UserActionTypes.ForgotPassword;
  constructor(public payload: string) {}
}
export class ForgotPasswordSuccess implements Action {
  readonly type = UserActionTypes.ForgotPasswordSuccess;
}
export class ForgotPasswordConfirm implements Action {
  readonly type = UserActionTypes.ForgotPasswordConfirm;
  constructor(
    public payload: { email: string; newPassword: string; code: string }
  ) {}
}

export type UserActions =
  | Login
  | LoginSuccess
  | SignUp
  | SignUpSuccess
  | Verify
  | VerifySuccess
  | UserError
  | Logout
  | ForgotPassword
  | ForgotPasswordConfirm
  | ForgotPasswordSuccess;
