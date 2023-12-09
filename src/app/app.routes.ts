import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistersComponent } from './pages/registers/registers.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full'},
    { path: "Cadastros", component: RegistersComponent, pathMatch: 'full'},
    { path: "Perfil", component: ProfileComponent},
    { path: "**", component: HomeComponent},
    { path: "",   redirectTo: '', pathMatch: 'full' }
];
