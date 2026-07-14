import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-pz5ud0ml7bp37ygz.us.auth0.com',
      clientId: '0TP7Gb5Zja5dIFppefvP24QWyNp8WXCx',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-pz5ud0ml7bp37ygz.us.auth0.com/api/v2/',
      },
      cacheLocation: 'localstorage',
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
