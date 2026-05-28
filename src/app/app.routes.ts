import { Routes } from '@angular/router';
import { UsersComponent } from './user/user';
import { SettingsComponent } from './components/settings/settings'; 
import { LoginComponent } from './login/login';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'configuracion', component: SettingsComponent },
  { path: '**', redirectTo: '/login' },
];
