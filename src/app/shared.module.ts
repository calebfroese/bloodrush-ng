import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationGuard } from './authentication.guard';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [AuthenticationGuard],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule],
})
export class SharedModule {}
