import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { Analytics } from '../../services/analytics';

@Component({
  selector: 'app-settings', 
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './settings.html', 
  styleUrls: ['./settings.css']
})
export class SettingsComponent {
  protected readonly auth = inject(AuthService);
  protected readonly analytics = inject(Analytics)

  appInfo = {
    name: 'SMART GYM',
    version: '1.0.0',
    userAgent: navigator.userAgent
  };

  gymLogo = '/logo.jpeg'; 
  showAppInfo = false; 


  logout() {
    const isConfirmed = window.confirm("Are you sure you want to log out of Smart Gym?");
    if (isConfirmed) {
      this.analytics.trackFeatureAction('loguot_click');
      this.auth.logout({
        logoutParams: {
          returnTo: document.location.origin
        }
      });
    }
  }

  toggleAppInfo() {
    this.showAppInfo = !this.showAppInfo; 
  }
}