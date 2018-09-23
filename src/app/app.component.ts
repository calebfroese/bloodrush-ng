import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;

  constructor(public fb: FormBuilder, public loginService: LoginService) {
    this.form = this.fb.group({
      username: this.fb.control('', [
        Validators.email,
        Validators.minLength(6),
      ]),
      password: this.fb.control('', [Validators.minLength(6)]),
    });
  }

  async register({ username, password }: any) {
    await this.loginService.registerAccount(username, password);
  }

  async login({ username, password }: any) {
    await this.loginService.login(username, password);
  }
}
