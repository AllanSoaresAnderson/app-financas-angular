import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistersComponent } from './pages/registers/registers.component';


export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full'},
    { path: "Registers", component: RegistersComponent, pathMatch: 'full'},
    { path: "**", component: HomeComponent},
    { path: "",   redirectTo: '', pathMatch: 'full' }
];
