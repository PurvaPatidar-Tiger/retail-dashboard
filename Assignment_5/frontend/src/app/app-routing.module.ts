import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './shared/layout/empty/empty.component';
import { BasicComponent } from './shared/layout/basic/basic.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: EmptyComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },

  // Landing routes
  {
    path: 'app',
    component: BasicComponent,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
    canActivate: [AuthGuard,AdminGuard],
  },

  {
    path: 'admin',
    component: BasicComponent,
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
  },


  {
    path: '**',
    redirectTo: 'app/analytics',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
