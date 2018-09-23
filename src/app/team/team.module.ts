import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared.module';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamEffects } from './team.effects';
import * as fromTeam from './team.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('team', fromTeam.reducer),
    EffectsModule.forFeature([TeamEffects]),
    SharedModule,
  ],
  declarations: [CreateTeamComponent],
  exports: [CreateTeamComponent],
})
export class TeamModule {}
