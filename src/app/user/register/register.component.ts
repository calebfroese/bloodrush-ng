import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SignUp } from '../actions/user.actions';
import { getSignUpLoading } from '../reducers/user.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading$: Observable<boolean>;

  constructor(public store: Store<any>, public fb: FormBuilder) {
    this.form = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {
    this.loading$ = this.store.select(getSignUpLoading);
  }

  submit(value: { email: string; password: string }) {
    this.store.dispatch(new SignUp(value));
  }
}
