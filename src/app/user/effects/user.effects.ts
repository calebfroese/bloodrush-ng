import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap, mapTo, filter } from 'rxjs/operators';

import { LoginService } from '../../login.service';
import * as UserActions from '../actions/user.actions';
import { UserActionTypes } from '../actions/user.actions';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  @Effect()
  loginFromCache$ = this.loginService.loginFromCache().pipe(
    filter(Boolean),
    map(user => new UserActions.LoginSuccess(user))
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<UserActions.Login>(UserActionTypes.Login),
    switchMap(action =>
      this.loginService
        .login(action.payload.email, action.payload.password)
        .pipe(
          map(response => new UserActions.LoginSuccess(response)),
          catchError(err => of(new UserActions.UserError(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<UserActions.LoginSuccess>(UserActionTypes.LoginSuccess),
    tap(action =>
      localStorage.setItem('userSession', JSON.stringify(action.payload))
    ),
    tap(() => this.router.navigate(['/home']))
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType<UserActions.SignUp>(UserActionTypes.SignUp),
    switchMap(action =>
      this.loginService
        .registerAccount(action.payload.email, action.payload.password)
        .pipe(
          map(response => new UserActions.SignUpSuccess(response)),
          catchError(err => of(new UserActions.UserError(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  signUpSuccess$ = this.actions$.pipe(
    ofType<UserActions.SignUpSuccess>(UserActionTypes.SignUpSuccess),
    tap(() => this.router.navigate(['/verify']))
  );

  @Effect()
  verify$ = this.actions$.pipe(
    ofType<UserActions.Verify>(UserActionTypes.Verify),
    switchMap(action =>
      this.loginService
        .confirmRegistration(action.payload.email, action.payload.code)
        .pipe(
          map(response => new UserActions.VerifySuccess(response)),
          catchError(err => of(new UserActions.UserError(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  verifySuccess$ = this.actions$.pipe(
    ofType<UserActions.VerifySuccess>(UserActionTypes.VerifySuccess),
    tap(() => this.router.navigate(['/login']))
  );

  @Effect({ dispatch: false })
  resendVerification$ = this.actions$.pipe(
    ofType<UserActions.ResendVerification>(UserActionTypes.ResendVerification),
    switchMap(action =>
      this.loginService.resendVerification(action.payload).pipe(
        tap(() =>
          this.snackbar.open('Verification code re-sent', 'OK', {
            duration: 2000,
          })
        ),
        catchError(err => of(new UserActions.UserError(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  genericError$ = this.actions$.pipe(
    ofType<UserActions.UserError>(UserActionTypes.UserError),
    tap(action =>
      this.snackbar.open(action.payload.message || 'Action failed', 'OK', {
        duration: 2000,
      })
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<UserActions.Logout>(UserActionTypes.Logout),
    tap(() => localStorage.clear()),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  forgotPassword$ = this.actions$.pipe(
    ofType<UserActions.ForgotPassword>(UserActionTypes.ForgotPassword),
    switchMap(action =>
      this.loginService.forgotPassword(action.payload).pipe(
        tap(result =>
          this.snackbar.open(
            `Reset code has been sent to your email at ${
              result.CodeDeliveryDetails.Destination
            }`,
            'OK',
            {
              duration: 2000,
            }
          )
        ),
        mapTo(new UserActions.ForgotPasswordSuccess()),
        catchError(err => of(new UserActions.UserError(err)))
      )
    )
  );

  @Effect()
  forgotPasswordConfirm$ = this.actions$.pipe(
    ofType<UserActions.ForgotPasswordConfirm>(
      UserActionTypes.ForgotPasswordConfirm
    ),
    switchMap(action =>
      this.loginService
        .forgotPasswordConfirm(
          action.payload.email,
          action.payload.newPassword,
          action.payload.code
        )
        .pipe(
          tap(() =>
            this.snackbar.open('Successfully updated password', 'OK', {
              duration: 2000,
            })
          ),
          map(
            () =>
              new UserActions.Login({
                email: action.payload.email,
                password: action.payload.newPassword,
              })
          ),
          catchError(err => of(new UserActions.UserError(err)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}
