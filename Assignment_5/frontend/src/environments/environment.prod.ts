import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.DEBUG,
  serverLogLevel: NgxLoggerLevel.ERROR,
  defaultLanguage: 'fr',
  supportedLanguages: {'englist':'en', 'french':'fr', 'russian':'ru', 'tamil':'ta'}
};
