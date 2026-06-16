import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings', 
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './settings.html', 
  styleUrls: ['./settings.css']
})
export class SettingsComponent {

  appInfo = {
    name: 'SMART GYM',
    version: '1.0.0',
    userAgent: navigator.userAgent
  };

  gymLogo = '/logo.jpeg'; 
  showAppInfo = false; 

  constructor(public auth: AuthService) {}

  logout() {
    const isConfirmed = window.confirm("Are you sure you want to log out of Smart Gym?");
    if (isConfirmed) {
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