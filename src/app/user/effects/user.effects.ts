import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { LoginService } from '../../login.service';
import * as UserActions from '../actions/user.actions';
import { UserActionTypes } from '../actions/user.actions';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
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

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}
