import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInModule } from './signin/signin.module';
import { SignUpModule } from './signup/signup.module';
import { SignOutModule } from './signout/signout.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import {TranslateModule} from '@ngx-translate/core';
import { AuthTranslateModule } from './authTranslate.module';

@NgModule({
  declarations: [],
  imports: [
    // TranslateModule.forChild({
    //         isolate: true
    // }),
    SignInModule,
    SignUpModule,
    SignOutModule,
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    AuthTranslateModule
  ],
})
export class AuthModule {}
