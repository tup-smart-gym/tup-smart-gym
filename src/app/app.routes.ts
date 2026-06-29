import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { UsersComponent } from './user/user';
import { SettingsComponent } from './components/settings/settings'; 
import { LayoutComponent } from './main-layout/main-layout';
import { RoomsComponent } from './components/rooms/rooms';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { 
    path: 'main', 
    component: LayoutComponent,
    canActivate: [authGuardFn],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/main' },
];