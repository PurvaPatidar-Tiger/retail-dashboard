import { NgModule } from '@angular/core';
// Translation.
import { TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthHttpLoaderFactory } from 'src/app/core/services/translator/translate.service';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: AuthHttpLoaderFactory,
              deps: [ HttpClient ]
            }
          })
    ],
    exports: [
        TranslateModule
    ]
})
export class AuthTranslateModule
{
    constructor(private translationService: TranslateService) {
      this.translationService.addLangs(Object.values(environment.supportedLanguages));
      let currentLang = window.localStorage.getItem('prefLanguage') || environment.defaultLanguage;
      this.translationService.use(currentLang);
      this.translationService.currentLang = currentLang;
      
      this.translationService.store.onLangChange.subscribe(
        (lang: LangChangeEvent) => {
          console.log(' ==> LazyLoadedModule Auth Transalte', lang);
          this.translationService.use(lang.lang);
          this.translationService.currentLang = lang.lang;
        }
      );
      }
}
