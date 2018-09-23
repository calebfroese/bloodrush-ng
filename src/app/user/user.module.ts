import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared.module';
import { UserEffects } from './effects/user.effects';
import { LoginComponent } from './login/login.component';
import * as fromUser from './reducers/user.reducer';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [LoginComponent],
})
export class UserModule {}
