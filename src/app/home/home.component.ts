import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { FetchTeams } from '../team/team.actions';
import { Logout } from '../user/actions/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new FetchTeams());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
