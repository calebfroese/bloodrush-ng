import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { LoginService } from '../../login.service';
import * as UserActions from '../actions/user.actions';
import { UserActionTypes } from '../actions/user.actions';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  @Effect()
  signUp$ = this.actions$.pipe(
    tap(action => {
      console.log(action);
    }),
    ofType<UserActions.SignUp>(UserActionTypes.SignUp),
    switchMap(action =>
      this.loginService
        .registerAccount(action.payload.email, action.payload.password)
        .pipe(
          map(response => new UserActions.SignUpSuccess(response)),
          catchError(err => of(new UserActions.SignUpError(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  signUpError$ = this.actions$.pipe(
    ofType<UserActions.SignUpError>(UserActionTypes.SignUpError),
    tap(action =>
      this.snackbar.open(
        action.payload.message || 'Unable to register account',
        'OK',
        { duration: 2000 }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private snackbar: MatSnackBar
  ) {}
}
