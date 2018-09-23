import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared.module';
import { UserEffects } from './effects/user.effects';
import { LoginComponent } from './login/login.component';
import * as fromUser from './reducers/user.reducer';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [LoginComponent, RegisterComponent, VerifyComponent, ForgotPasswordComponent],
})
export class UserModule {}
