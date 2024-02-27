import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistersComponent } from './pages/registers/registers.component';
import { TransactionComponent } from './pages/registers/views-entities/transaction/transaction.component';
import { EntityComponent } from './pages/registers/views-entities/entity/entity.component';
import { ProductComponent } from './pages/registers/views-entities/product/product.component';


export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full'},
    { path: "Registers", component: RegistersComponent, pathMatch: 'full'},
    { path: "Registers/Transactions", component: TransactionComponent, pathMatch: 'full'},
    { path: "Registers/Entities", component: EntityComponent, pathMatch: 'full'},
    { path: "Registers/Products", component: ProductComponent, pathMatch: 'full'},
    { path: "**", component: HomeComponent},
    { path: "",   redirectTo: '', pathMatch: 'full' }
];
