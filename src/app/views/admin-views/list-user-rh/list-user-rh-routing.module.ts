import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserRhComponent } from './list-user-rh/list-user-rh.component';

const routes: Routes = [
  {path:'',component:ListUserRhComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUserRHRoutingModule { }
