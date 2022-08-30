import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list.component';
import { ExampleComponent } from './example/example.component';
// import { AdminResolver } from './admin.resolvers';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    // resolve: { data: AdminResolver },
  },
  { path: 'example', component: ExampleComponent },
  { path: '', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
