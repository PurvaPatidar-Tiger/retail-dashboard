import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './angular-material.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

// // AoT requires an exported function for factories
export function AppHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return 'No transaltion';
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: AppHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularMaterialModule.forRoot(),
    LoggerModule.forRoot({
      serverLoggingUrl: `http://localhost:68552/`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
