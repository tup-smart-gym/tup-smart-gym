import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserProfileComponent } from '../user-profile/user-profile';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, UserProfileComponent, TranslatePipe],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class SettingsComponent {
  private translate = inject(TranslateService);

  appInfo = {
    name: 'SMART GYM',
    version: '1.0.0',
    userAgent: navigator.userAgent,
  };

  gymLogo = '/logo.jpeg';
  showAppInfo = false;

  constructor(public auth: AuthService) {}

  logout() {
    const msg = this.translate.instant('SETTINGS.LOGOUT_CONFIRM');
    if (window.confirm(msg)) {
      this.auth.logout({
        logoutParams: {
          returnTo: document.location.origin,
        },
      });
    }
  }

  toggleAppInfo() {
    this.showAppInfo = !this.showAppInfo;
  }
}