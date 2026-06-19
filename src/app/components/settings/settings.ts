import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class SettingsComponent {
  private router = inject(Router);
  private translate = inject(TranslateService);

  user = {
    fullName: 'Lionel Messi',
    email: 'lionelmessi@smartgym.com',
    profilePhoto:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    idNumber: '34.789.235',
    city: 'La Plata',
  };

  appInfo = {
    name: 'SMART GYM',
    version: '1.0.0',
    userAgent: navigator.userAgent,
  };

  gymLogo = '/logo.jpeg';
  showAppInfo = false;

  logout() {
    const msg = this.translate.instant('SETTINGS.LOGOUT_CONFIRM');
    if (window.confirm(msg)) {
      sessionStorage.removeItem('session_active');
      this.router.navigate(['/login']);
    }
  }

  toggleAppInfo() {
    this.showAppInfo = !this.showAppInfo;
  }
}
