import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
    UserRoutingModule
  ],
  declarations: [LoginComponent]
})
export class UserModule { }
