import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Analytics } from './services/analytics';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tup-smart-gym');
  protected readonly auth = inject(AuthService);
  private readonly analytics = inject(Analytics);
  
  
  constructor() {
    this.auth.user$.subscribe(user => {
      if(user?.email){
        this.analytics.trackLogin(user.email);
        Sentry.setUser({email: user.email});
        this.forceTestError(user.email);
      }
    });
  }

  private forceTestError(email: string): void {
    try {
      throw new Error(`Error de prueba forzado para el usuario ${email}`);
    } catch (error) {
      Sentry.captureException(error);
    }
  }
}
