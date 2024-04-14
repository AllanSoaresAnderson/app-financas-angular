import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../../../models/Product';
import { CommonModule } from '@angular/common';
import { FormPage } from '../../../global/crud-page/form-page';
import { MessagePageService } from '../../../../services/message-page.service';

@Component({
  selector: 'app-form-products',
  standalone: true,
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css',
  imports: [SelectInputComponent, FormsModule, RouterModule, CommonModule]
})
export class FormProductsComponent extends FormPage implements OnInit {
  override pathReturn: string = 'products';

  constructor(
    protected override messagePageService: MessagePageService,
    protected override router: Router
    ) { super(messagePageService, router) }

  ngOnInit(): void {
    this.verifyUpdateOrCreate();
  }
  @Input() override id: number | null = null;


  override validateFields(): boolean {
    if (this.selectedProductType !== 'Eventual' && this.selectedProductType !== 'Recurring') {
      this.fieldsError.set('selectedProductType', true);
      return false
    }
    this.product.name = this.product.name?.trim()
    if (!this.product.name || this.product.name.length < 2 || this.product.name.length > 50) {
      this.fieldsError.set('product.name', true);
      return false
    }
    if (this.selectedValueType !== 'Unit Price' && this.selectedValueType !== 'Total Value') {
      this.fieldsError.set('selectedValueType', true);
      return false
    }
    if (this.value < 1) {
      this.fieldsError.set('value', true);
      return false
    }
    if (this.value < 1) {
      this.fieldsError.set('value', true);
      return false
    }
    if (this.selectedValueType === 'Total Value' && this.quantityUnits < 1) {
      this.fieldsError.set('quantityUnits', true);
      return false
    }
    return true
  }

  override add(): void {
    throw new Error('Method not implemented.');
  }
  override update(): void {
    throw new Error('Method not implemented.');
  }
  override getById(): void {
    throw new Error('Method not implemented.');
  }
  override cleanRegister(): void {
    this.product = new Product();
  }

  override configPageAdd(): void {
    this.cleanRegister();
  }

  listProductType: string[] = ['Eventual', 'Recurring']
  selectedProductType: string = 'Eventual'
  listValueType: string[] = ['Unit Price', 'Total Value']
  selectedValueType: 'Unit Price' | 'Total Value' = 'Unit Price'
  value: number = 0;
  quantityUnits: number = 1;

  product: Product = new Product();

}
