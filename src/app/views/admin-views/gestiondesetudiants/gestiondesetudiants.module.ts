import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GestiondesetudiantsRoutingModule } from './gestiondesetudiants-routing.module';




// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';
// component


// Ng Search 
import { NgPipesModule } from 'ngx-pipes';

// Sorting page
import { CustomersComponent } from './customers/customers.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateEtudiantComponent } from './create-etudiant/create-etudiant.component';



@NgModule({
  declarations: [
    CustomersComponent,
    CreateEtudiantComponent

  ],
  imports: [
    CommonModule,
    GestiondesetudiantsRoutingModule,
    NgPipesModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestiondesetudiantsModule { }
