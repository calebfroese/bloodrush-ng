import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ResendVerification, Verify } from '../actions/user.actions';
import { getEmail, getVerifyLoading } from '../reducers/user.reducer';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;
  loading$: Observable<boolean>;

  constructor(public store: Store<any>, public fb: FormBuilder) {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      code: this.fb.control(''),
    });
    this.sub = this.store.select(getEmail).subscribe(email => {
      if (email) this.form.patchValue({ email });
    });
  }

  ngOnInit() {
    this.loading$ = this.store.select(getVerifyLoading);
  }

  resend(email: string) {
    this.store.dispatch(new ResendVerification(email));
  }

  submit(value: { email: string; code: string }) {
    this.store.dispatch(new Verify(value));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
