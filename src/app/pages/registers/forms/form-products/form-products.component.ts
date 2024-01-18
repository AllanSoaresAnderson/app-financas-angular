import { Component } from '@angular/core';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";

@Component({
    selector: 'app-form-products',
    standalone: true,
    templateUrl: './form-products.component.html',
    styleUrl: './form-products.component.css',
    imports: [SelectInputComponent]
})
export class FormProductsComponent {
  listProductType:string[] = ['Eventual', 'Recurring']
  selectedProductType:string = 'Eventual'
  listValueType:string[] = ['Unit Price', 'Total Value']
  selectedValueType:string = 'Unit Price'
}
