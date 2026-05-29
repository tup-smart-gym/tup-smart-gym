import { Routes } from '@angular/router';
import { UsersComponent } from './user/user';
import { SettingsComponent } from './components/settings/settings'; 
import { LayoutComponent } from './main-layout/main-layout';
//import { ItemsComponent } from './components/items/items';


export const routes: Routes = [
    { 
    path: '', 
    component: LayoutComponent,
    children: [
      //{ path: 'items', component: ItemsComponent },
      { path: 'configuracion', component: SettingsComponent },
      { path: '', redirectTo: 'items', pathMatch: 'full' },
      {path: 'users', component: UsersComponent},
    ]
  }
];
