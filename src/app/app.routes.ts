import { Routes } from '@angular/router';
import { UsersComponent } from './user/user';
import { SettingsComponent } from './components/settings/settings'; 
import { LayoutComponent } from './main-layout/main-layout';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'main', 
    component: LayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }, 
];