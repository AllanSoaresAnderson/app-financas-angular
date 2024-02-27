import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudButtonsComponent } from "../../../../components/buttons/crud-buttons/crud-buttons.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { FormProductsComponent } from "../../forms/form-products/form-products.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s', style({ opacity: 1 })),
            ]),
        ])
    ],
    imports: [CommonModule, FormsModule, CrudButtonsComponent, FormProductsComponent, RouterModule]
})
export class ProductComponent {
  listTransactions:any[]=[];
  crudState:string = 'read';

  crudOptions(option:string){
      this.crudState = option
  }


  readSignalButton(event:string){
        if(event === 'cancel'){
            this.crudState = 'read';
        }
    }
}
