import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { ApplicationGuardService } from './services/guards/application-guard.service';



const routes: Routes = [
 
  {
    path: 'login',
    component: AuthLayoutComponent,
  },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [ApplicationGuardService],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/rh-views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      }
      // {
      //   path: 'addcandidate',
      //   loadChildren: () =>
      //     import('./views/rh-views/add-candidate/add-candidate.module').then(
      //       (m) => m.AddCandidateModule
      //     ),
      // }
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [ApplicationGuardService],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/admin-views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'adduser',
        loadChildren: () =>
          import('./views/admin-views/add-user-rh/add-user-rh.module').then(
            (m) => m.AddUserRHModule
          ),
      },
      {
        path: 'Utilisateurs',
        loadChildren: () =>
          import('./views/admin-views/list-user-rh/list-user-rh.module').then(
            (m) => m.ListUserRHModule
          ),
      },
      {
        path: 'AffectationdeTaches', loadChildren: () => import('./views/admin-views/affectationde-taches/affectationde-taches.module').then(m => m.AffectationdeTachesModule)
      },
      {
        path: 'gestiondesetudiants', loadChildren: () => import('./views/admin-views/gestiondesetudiants/gestiondesetudiants.module').then(m => m.GestiondesetudiantsModule)
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
