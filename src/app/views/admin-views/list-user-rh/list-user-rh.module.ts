import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserRHRoutingModule } from './list-user-rh-routing.module';
import { ListUserRhComponent } from './list-user-rh/list-user-rh.component';


@NgModule({
  declarations: [
    ListUserRhComponent
  ],
  imports: [
    CommonModule,
    ListUserRHRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListUserRHModule { }
