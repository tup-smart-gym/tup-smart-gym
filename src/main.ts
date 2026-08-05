import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import * as Sentry from "@sentry/angular"

Sentry.init({
  dsn: "https://1809f8823e73ddb608e78c8b7b844a33@o4511819299028992.ingest.us.sentry.io/4511819302961152",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/angular/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: []
  }
});


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
