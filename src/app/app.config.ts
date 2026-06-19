import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-pz5ud0ml7bp37ygz.us.auth0.com',
      clientId: '0TP7Gb5Zja5dIFppefvP24QWyNp8WXCx',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-pz5ud0ml7bp37ygz.us.auth0.com/api/v2/',
      },
      cacheLocation: 'localstorage',
    }),
    provideTranslateService(),
    provideTranslateHttpLoader({
      prefix: '/i18n/',
      suffix: '.json',
    }),
  ],
};
