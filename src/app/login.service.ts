import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import { Observable, Observer } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  pool = new CognitoUserPool({
    UserPoolId: environment.cognito.userPoolId,
    ClientId: environment.cognito.clientId,
  });

  registerAccount(email: string, password: string): Observable<ISignUpResult> {
    const emailAttr = new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    });
    return Observable.create((obs: Observer<any>) => {
      this.pool.signUp(email, password, [emailAttr], null, (err, data) => {
        if (err) obs.error(err);
        else obs.next(data);
        obs.complete();
      });
    });
  }

  confirmRegistration(username: string, code: string): Observable<void> {
    const user = new CognitoUser({
      Username: username,
      Pool: this.pool,
    });
    return Observable.create((obs: Observer<any>) => {
      user.confirmRegistration(code, false, (err, data) => {
        if (err) obs.error(err);
        else obs.next(data);
        obs.complete();
      });
    });
  }

  resendVerification(username: string): Observable<string> {
    const user = new CognitoUser({
      Username: username,
      Pool: this.pool,
    });
    return Observable.create((obs: Observer<any>) => {
      user.resendConfirmationCode((err, data) => {
        if (err) obs.error(err);
        else obs.next(data);
        obs.complete();
      });
    });
  }

  // login(username: string, password: string): Observable<any> {
  //   const user = new CognitoUser({
  //     Username: username,
  //     Pool: this.pool,
  //   });
  //   const auth = new AuthenticationDetails({
  //     Username: username,
  //     Password: password,
  //   });
  //   return new Promise((resolve, reject) => {
  //     user.authenticateUser(auth, {
  //       onSuccess: resolve,
  //       onFailure: reject,
  //     });
  //   });
  // }
}
