import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistersComponent } from './pages/registers/registers.component';
import { PaymentsComponent } from './pages/payments/payments.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full'},
    { path: "Cadastros", component: RegistersComponent, pathMatch: 'full'},
    { path: "Perfil", component: ProfileComponent, pathMatch: 'full'},
    { path: "Pagamentos", component: PaymentsComponent, pathMatch: 'full'},
    { path: "**", component: HomeComponent},
    { path: "",   redirectTo: '', pathMatch: 'full' }
];
