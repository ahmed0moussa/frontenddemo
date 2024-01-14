import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectationdeTachesComponent } from './affectationde-taches/affectationde-taches.component';

const routes: Routes = [{
  path: "",
  component: AffectationdeTachesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectationdeTachesRoutingModule { }
