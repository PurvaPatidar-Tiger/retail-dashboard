import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';


const routes: Routes = [
  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'dashboard',
    component: AnalyticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DashboardRoutingModule {}
