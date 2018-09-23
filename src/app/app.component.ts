import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginSuccess } from './user/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public store: Store<any>) {
    const session = localStorage.getItem('userSession');
    if (session) this.store.dispatch(new LoginSuccess(JSON.parse(session)));
  }
}
