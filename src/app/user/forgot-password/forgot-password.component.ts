import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ForgotPassword, ForgotPasswordConfirm } from '../actions/user.actions';
import {
  getForgotPasswordCodeReady,
  getForgotPasswordLoading,
} from '../reducers/user.reducer';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading$: Observable<boolean>;
  readyToVerify$: Observable<boolean>;
  sub: Subscription;

  constructor(public store: Store<any>, public fb: FormBuilder) {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      newPassword: this.fb.control(''),
      code: this.fb.control(''),
    });
  }

  ngOnInit() {
    this.loading$ = this.store.select(getForgotPasswordLoading);
    this.readyToVerify$ = this.store.select(getForgotPasswordCodeReady).pipe(
      tap(codeReady => {
        if (codeReady && !this.form.controls['newPassword']) {
          this.form.addControl(
            'newPassword',
            this.fb.control('', [Validators.required, Validators.minLength(6)])
          );
          this.form.addControl(
            'code',
            this.fb.control('', [Validators.required, Validators.minLength(6)])
          );
        }
      })
    );
  }

  submit(email: string) {
    this.store.dispatch(new ForgotPassword(email));
  }

  confirm(value: { code: string; newPassword: string; email: string }) {
    this.store.dispatch(new ForgotPasswordConfirm(value));
  }
}
