import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistersComponent } from './pages/registers/registers.component';
import { TransactionComponent } from './pages/registers/views-entities/transaction/transaction.component';
import { EntityComponent } from './pages/registers/views-entities/entity/entity.component';
import { ProductComponent } from './pages/registers/views-entities/product/product.component';
import { FormTransactionComponent } from './pages/registers/forms/form-transaction/form-transaction.component';
import { FormEntityComponent } from './pages/registers/forms/form-entity/form-entity.component';
import { FormProductsComponent } from './pages/registers/forms/form-products/form-products.component';


export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: 'full' }, 
    { path: "home", component: HomeComponent },
    { path: "registers", component: RegistersComponent },
    { path: "transactions", component: TransactionComponent },
    { path: "entities", component: EntityComponent},
    { path: "entities/register", component: FormEntityComponent},
    { path: "entities/register/:id", component: FormEntityComponent},
    { path: "products", component: ProductComponent },
    { path: "**", redirectTo: "/home" } 
];
