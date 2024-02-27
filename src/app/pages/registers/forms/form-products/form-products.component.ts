import { Component, EventEmitter, Output } from '@angular/core';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../../../models/Product';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-form-products',
    standalone: true,
    templateUrl: './form-products.component.html',
    styleUrl: './form-products.component.css',
    imports: [SelectInputComponent, FormsModule, RouterModule, CommonModule]
})
export class FormProductsComponent {
  listProductType:string[] = ['Eventual', 'Recurring']
  selectedProductType:string = 'Eventual'
  listValueType:string[] = ['Unit Price', 'Total Value']
  selectedValueType:string = 'Unit Price'
  value:number = 0;
  quantityUnits:number = 1;

  fieldsError: Map<string, boolean> = new Map();
  product: Product = new Product();

  @Output() 
  signalButton: EventEmitter<string>= new EventEmitter();
  
  
  buttonEmit(signal:string){
    this.signalButton.emit(signal)
  }



  save(){
    this.fieldsError = new Map();
    if(this.validateFields()){

      
    }
  }

  validateFields(): boolean{
    if(this.selectedProductType !== 'Eventual' && this.selectedProductType !== 'Recurring'){
      this.fieldsError.set('selectedProductType', true);
      return false
    }
    this.product.name = this.product.name?.trim()
    if(!this.product.name || this.product.name.length < 2 || this.product.name.length > 50){
      this.fieldsError.set('product.name', true);
      return false
    } 
    if(this.selectedValueType !== 'Unit Price' && this.selectedValueType !== 'Total Value'){
      this.fieldsError.set('selectedValueType', true);
      return false
    }
    if(this.value < 1){
      this.fieldsError.set('value', true);
      return false
    }
    if(this.value < 1){
      this.fieldsError.set('value', true);
      return false
    }
    if(this.selectedValueType === 'Total Value' && this.quantityUnits < 1){
      this.fieldsError.set('quantityUnits', true);
      return false
    }
    return true
  }






}
