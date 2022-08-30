import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserListComponent } from './users/user-list.component';
import { ExampleComponent } from './example/example.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [UserListComponent, ExampleComponent],
  imports: [CommonModule, AdminRoutingModule, AngularMaterialModule],
})
export class AdminModule {}
