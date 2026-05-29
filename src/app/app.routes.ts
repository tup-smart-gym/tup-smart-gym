import { Routes } from '@angular/router';
import { UsersComponent } from './user/user';
import { SettingsComponent } from './components/settings/settings'; 

export const routes: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'configuracion', component: SettingsComponent}
];
