import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-transaction',
    standalone: true,
    templateUrl: './form-transaction.component.html',
    styleUrl: './form-transaction.component.css',
    imports: [CommonModule, SelectInputComponent, FormsModule]
})
export class FormTransactionComponent implements OnInit {

  transactionType:string[]= ['Expense', 'Earning']
  selectedTransactionType:string = 'Expense'
  listEntities:string[] = ['Júlia', 'Carro', 'Filhos', 'Me']
  selectedEntity:string = 'Me';
  listOptionsCategory: string[] = ['Fixed', 'Eventual'];
  selectedCategoryTransaction: string = 'Choose';
  listOptionsTypeFixedTransaction : string[] = [ 'Monthly', 'Annual', 'Weekly', 'Amount of Years', 'Amount of Months', 'Amount of Weeks', 'Amount of Days']
  selectedTypeFixedTransaction:string = 'Monthly';
  isInstallment:boolean = false;
  typeInstallments?:string = 'fixed';
  
  ngOnInit(): void {
  }

}
