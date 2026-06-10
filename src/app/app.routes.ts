import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { UsersComponent } from './user/user';
import { SettingsComponent } from './components/settings/settings'; 
import { LayoutComponent } from './main-layout/main-layout';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'main', 
    component: LayoutComponent,
    canActivate: [authGuardFn],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '**', component: LoginComponent }, 
];