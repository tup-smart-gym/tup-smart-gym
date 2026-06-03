import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings', 
  standalone: true, 
  templateUrl: './settings.html', 
  styleUrls: ['./settings.css']
})
export class SettingsComponent {
  user = {
    fullName: 'Lionel Messi',
    email: 'lionelmessi@smartgym.com',
    profilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    idNumber: '34.789.235',
    city: 'La Plata'
  };

  appInfo = {
    name: 'SMART GYM',
    version: '1.0.0',
    userAgent: navigator.userAgent
  };

  gymLogo = '/logo.jpeg'; 
  showAppInfo = false; 

  constructor(private router: Router) {}

  logout() {
    const isConfirmed = window.confirm("Are you sure you want to log out of Smart Gym?");
    if (isConfirmed) {
      this.router.navigate(['/login']);
    }
  }

  toggleAppInfo() {
    this.showAppInfo = !this.showAppInfo; 
  }
}