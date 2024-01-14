import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CreateEtudiantComponent } from './create-etudiant/create-etudiant.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'create',
    component: CreateEtudiantComponent
  },
  {
    path: 'update/:id',
    component: CreateEtudiantComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestiondesetudiantsRoutingModule { }
