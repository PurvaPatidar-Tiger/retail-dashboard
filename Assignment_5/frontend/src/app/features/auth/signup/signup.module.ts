import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignupComponent],
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
export class SignUpModule {}
