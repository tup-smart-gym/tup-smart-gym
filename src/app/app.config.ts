import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth0({
      domain: "dev-pz5ud0ml7bp37ygz.us.auth0.com",
      clientId: "0TP7Gb5Zja5dIFppefvP24QWyNp8WXCx",
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      
    }),
  ],
};
