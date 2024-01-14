import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffectationdeTachesRoutingModule } from './affectationde-taches-routing.module';
import { AffectationdeTachesComponent } from './affectationde-taches/affectationde-taches.component';

import { FormsModule } from '@angular/forms';
import { ActiveFilterPipe } from './affectationde-taches/active-filter.pipe';


@NgModule({
    declarations: [
        AffectationdeTachesComponent,
        ActiveFilterPipe
    ],
    imports: [
        FormsModule,
        CommonModule,
        AffectationdeTachesRoutingModule,
        
       
    ]
})
export class AffectationdeTachesModule { }
