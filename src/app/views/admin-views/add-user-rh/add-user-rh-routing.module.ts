import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserRhComponent } from './add-user-rh/add-user-rh.component';

const routes: Routes = [
  {path:'',component:AddUserRhComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUserRHRoutingModule { }
