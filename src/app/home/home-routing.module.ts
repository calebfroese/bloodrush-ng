import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../authentication.guard';
import { CreateTeamComponent } from '../team/create-team/create-team.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'create-team',
        component: CreateTeamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
