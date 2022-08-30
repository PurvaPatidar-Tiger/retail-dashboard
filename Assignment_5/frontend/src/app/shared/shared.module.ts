import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { EmptyComponent } from './layout/empty/empty.component';
import { BasicComponent } from './layout/basic/basic.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    EmptyComponent,
    BasicComponent,
    FooterComponent,
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    LimitToPipe,
    LocalDatePipe,
    YesNoPipe,
  ],
})
export class SharedModule {
  constructor() {
    //translate.use(window.localStorage.getItem('prefLanguage') || 'en')
  }
}
