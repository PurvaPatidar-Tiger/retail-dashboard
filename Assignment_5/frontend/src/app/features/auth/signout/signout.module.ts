import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignoutComponent } from './signout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignoutComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class SignOutModule {}
