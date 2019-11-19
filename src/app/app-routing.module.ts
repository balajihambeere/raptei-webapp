import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/dashboard/admin-dashboard.module').then(mod => mod.AdminDashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('./visitor/home/home.module').then(mod => mod.HomeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
