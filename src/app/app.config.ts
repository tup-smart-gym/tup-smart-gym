import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import * as Sentry from '@sentry/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth0({
      domain:'dev-pz5ud0ml7bp37ygz.us.auth0.com',
      clientId: '0TP7Gb5Zja5dIFppefvP24QWyNp8WXCx',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-pz5ud0ml7bp37ygz.us.auth0.com/api/v2/'
      },
      cacheLocation: 'localstorage'
    }),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps:[Sentry.TraceService],
      multi: true,
    },
  ]
};
