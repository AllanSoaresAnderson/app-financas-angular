import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormTransactionComponent } from './pages/registers/forms/form-transaction/form-transaction.component';
import { FormEntityComponent } from './pages/registers/forms/form-entity/form-entity.component';
import { FormProductsComponent } from './pages/registers/forms/form-products/form-products.component';
import { RegistersComponent } from './pages/registers/registers.component';


export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full'},
    { path: "Registers", component: RegistersComponent, pathMatch: 'full'},
    { path: "Registers/Transactions", component: FormTransactionComponent, pathMatch: 'full'},
    { path: "Registers/Entities", component: FormEntityComponent, pathMatch: 'full'},
    { path: "Registers/Products", component: FormProductsComponent, pathMatch: 'full'},
    { path: "**", component: HomeComponent},
    { path: "",   redirectTo: '', pathMatch: 'full' }
];
