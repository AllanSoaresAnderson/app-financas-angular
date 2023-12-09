import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistersComponent } from './pages/registers/registers.component';

export const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "Cadastros", component: RegistersComponent},
    { path: "Perfil", component: ProfileComponent},
    { path: "**", component: HomeComponent},
];
