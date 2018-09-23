import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { from, Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { LoginService } from './login.service';

@Injectable()
export class AppSyncService {
  private _client: Observable<AWSAppSyncClient<any>>;

  constructor(public loginService: LoginService) {}

  get client(): Observable<AWSAppSyncClient<any>> {
    return (
      this._client ||
      (this._client = from(
        new AWSAppSyncClient({
          url: environment.appsync.url,
          region: environment.appsync.region,
          auth: {
            type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
            jwtToken: () =>
              this.loginService.session.getAccessToken().getJwtToken(),
          },
        }).hydrated()
      ))
    );
  }
}
