import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromTeam from './team.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TeamEffects } from './team.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('team', fromTeam.reducer),
    EffectsModule.forFeature([TeamEffects])
  ],
  declarations: []
})
export class TeamModule { }
