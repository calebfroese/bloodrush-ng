import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Logout } from '../user/actions/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public store: Store<any>) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
