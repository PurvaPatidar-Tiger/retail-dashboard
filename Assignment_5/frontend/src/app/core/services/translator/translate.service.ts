import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';

export function AppInitializerTranslationsFactory(translate: TranslateService) {
  return () => new Promise<any>((resolve: any) => {
          const langToSet = window.localStorage.getItem('prefLanguage') || environment.defaultLanguage;
          translate.setDefaultLang(langToSet);
          translate.use(langToSet).subscribe(() => {}, err => {}, () => {
              resolve(null);
          });
  })
}

export function AppHttpLoaderFactory(httpClient: HttpClient) {

  return new TranslateHttpLoader(httpClient, "assets/i18n/app/", '.json');
}


export function AuthHttpLoaderFactory(httpClient: HttpClient) {

  return new TranslateHttpLoader(httpClient, "assets/i18n/auth/", '.json');
}

export function AdminHttpLoaderFactory(httpClient: HttpClient) {

  return new TranslateHttpLoader(httpClient, "assets/i18n/admin/", '.json');
}