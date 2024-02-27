import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator'



@NgModule({
  imports: [CommonModule, MatPaginatorModule],
  declarations: [],
  exports: [MatPaginator]
})
export class PaymentCardModule { }