import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { FormsModule } from '@angular/forms';
import { EventualTransaction } from '../../../../models/EventualTransaction';
import { FixedTransaction } from '../../../../models/FixedTransaction';
import { Transactions } from '../../../../models/Transactions';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-form-transaction',
    standalone: true,
    templateUrl: './form-transaction.component.html',
    styleUrl: './form-transaction.component.css',
    imports: [CommonModule, SelectInputComponent, FormsModule, RouterModule],
})
export class FormTransactionComponent implements OnInit {

  transactionType:string[]= ['Expense', 'Earning']
  listEntities:string[] = ['Júlia', 'Carro', 'Filhos', 'Me']
  selectedEntity:string = 'Me';
  listOptionsCategory: string[] = ['Fixed', 'Eventual'];
  listOptionsTypeFixedTransaction : string[] = [ 'Monthly', 'Annual', 'Weekly', 'Amount of Years', 'Amount of Months', 'Amount of Weeks', 'Amount of Days']

  fieldsError: Map<string, boolean> = new Map();

  fieldError?:string;
  
  totalValue: number = 0;
  eventualTransaction?:EventualTransaction;
  fixedTransaction?:FixedTransaction;
  selectedDate?:string;
  disabledFieldsUpdate:boolean = false;

  @Input()
  transaction?:Transactions;
  @Input()
  crudOptions:string = 'create'
  @Output() 
  signalButton: EventEmitter<string>= new EventEmitter();
 
  
  ngOnInit(): void {
    switch(this.crudOptions){
      case 'create':
        this.transaction = new Transactions();
        this.transaction.type = 'Expense';
        this.transaction.name = '';
        this.disabledFieldsUpdate = false;
        break;
      case 'update':
        this.disabledFieldsUpdate = true
        break;
      default:
        this.crudOptions = 'create'
        this.transaction = new Transactions();
        this.transaction.type = 'Expense';
        this.transaction.name = '';
        this.disabledFieldsUpdate = false;
    }

    if(this.transaction === undefined || this.transaction === null){
      this.transaction = new Transactions();
      this.transaction.type = 'Expense';
      this.transaction.name = '';
      this.crudOptions = 'create'
      this.disabledFieldsUpdate = false;
    }
  }

  save(){
    this.fieldsError = new Map();
    if(this.validateFields()){
      
    }
  }

  validateFields(): boolean{
    if(!this.validateFieldsTransaction()){
      return false;
    }
    if(this.transaction?.categoryType === 'Fixed'
      && !this.validateFieldsFixedTransaction()){
      return false;
    }
    if(this.transaction?.categoryType === 'Eventual'
      && !this.validateFieldsEventualTransaction()){
        return false;
    }
    return true;
  }

  validateFieldsEventualTransaction(): boolean{
    if(this.eventualTransaction === undefined 
      || this.eventualTransaction === null){
        return false;
      }
      if(this.selectedDate === undefined
        || new Date(this.selectedDate) < new Date()){
        this.fieldsError.set('selectedDate', true);
        return false;
      }
    if(this.totalValue < 1){
      this.fieldsError.set('totalValue', true);
      return false;
    }
    return true;
  }


  validateFieldsTransaction(): boolean{
    if(this.transaction === undefined || this.transaction === null){
      return false;
    }
    if(this.transaction.type !== 'Expense' && this.transaction.type !== 'Earning'){
      this.fieldsError.set('transaction.type', true);
      return false;
    } 

    if(this.transaction.categoryType !== 'Fixed' && this.transaction.categoryType !== 'Eventual'){
      this.fieldsError.set('transaction.categoryType', true);
      return false;
    }
    this.transaction.name = this.transaction.name?.trim()
    if(!this.transaction.name|| this.transaction.name?.length > 50){
      this.fieldsError.set('transaction.name', true);
      return false;
    }
    return true;
  }


  validateFieldsFixedTransaction():boolean{
    if(this.fixedTransaction === undefined || this.fixedTransaction === null){
      return false;
    }
    if(!this.validateTypeFixedTransaction()){
      return false;
    }else{
      if(
        (this.fixedTransaction.type === 'Amount of Years'
          || this.fixedTransaction.type === 'Amount of Months'
          || this.fixedTransaction.type === 'Amount of Weeks'
          || this.fixedTransaction.type === 'Amount of Days')
      && 
        (this.fixedTransaction.amountTime === undefined 
          ||this.fixedTransaction.amountTime < 1)
      ){
        this.fieldsError.set('fixedTransaction.amountTime', true);
        return false;
      }
    }
    if(this.fixedTransaction.isInstallment !== true && this.fixedTransaction.isInstallment !== false){
      this.fieldsError.set('fixedTransaction.isInstallment', true);
      return false;
    }else{
      if(this.fixedTransaction.isInstallment ){
        if(this.fixedTransaction.typeInstallment !== 'Fixed' && this.fixedTransaction.typeInstallment !== 'Variable'){
          this.fieldsError.set('fixedTransaction.typeInstallment', true);
          return false;
        }
        if(this.fixedTransaction.amountInstallment === undefined 
          || this.fixedTransaction.amountInstallment === null
          || this.fixedTransaction.amountInstallment < 2){
            this.fieldsError.set('fixedTransaction.amountInstallment', true);
            return false;
          }
      }else{
        this.fixedTransaction.typeInstallment = undefined;
        this.fixedTransaction.amountInstallment = undefined;
      }
    }
    if(this.selectedDate === undefined
      || new Date(this.selectedDate) < new Date()){
      this.fieldsError.set('selectedDate', true);
      return false;
    }
    if(this.totalValue < 1){
      this.fieldsError.set('totalValue', true);
      return false;
    }
    return true;
  }


  validateTypeFixedTransaction():boolean{
    switch(this.fixedTransaction?.type){
      case 'Monthly':
        this.fixedTransaction.amountTime = undefined;
        return true;
      case 'Annual':
        this.fixedTransaction.amountTime = undefined;
        return true;
      case 'Weekly':
        this.fixedTransaction.amountTime = undefined;
        return true;
      case 'Amount of Years':
        return true;
      case 'Amount of Months':
        return true;
      case 'Amount of Weeks':
        return true;
      case 'Amount of Days':
        return true;
    }
    this.fieldsError.set('fixedTransaction.type', true);
    return false;
  }

  categoryTransactionChange(event: string){
    if(this.transaction != undefined && this.transaction != null){
      this.transaction.categoryType = event;
      if(this.transaction.categoryType === 'Eventual'
        && (this.eventualTransaction === undefined
        || this.eventualTransaction === null)){
        this.eventualTransaction = new EventualTransaction();
      }else if (this.transaction.categoryType === 'Fixed'
      && (this.fixedTransaction === undefined
      || this.fixedTransaction === null)){
        this.fixedTransaction = new FixedTransaction();
        this.fixedTransaction.type = 'Monthly';
        this.fixedTransaction.isInstallment = false;
      }
    }
  }


  isInstallmentChange(event:boolean){
    if(this.fixedTransaction != null && this.fixedTransaction != undefined){
      this.fixedTransaction.isInstallment = event;
    }
  }

  fixedTypeChange(event:string){
    if(this.fixedTransaction != null && this.fixedTransaction != undefined){
      this.fixedTransaction.type = event;
    }
  }

  transactionTypeChange(event:string){
    if(this.transaction != null && this.transaction != undefined){
      this.transaction.type = event;
    }

  }

  typeInstallmentChange(event:string){
    if(this.fixedTransaction != null && this.fixedTransaction != undefined){
      this.fixedTransaction.typeInstallment = event;
    }
  }

  transactionNameChange(event:string){
    if(this.transaction != undefined && this.transaction != null){
      this.transaction.name = event
    }
  }

  fixedTransactionAmountTimeChange(event:number){
    if(this.fixedTransaction != undefined && this.fixedTransaction != null){
      this.fixedTransaction.amountTime = event
    }
  }

  fixedTransactionAmountInstallmentChange(event:number){
    if(this.fixedTransaction != undefined && this.fixedTransaction != null){
      this.fixedTransaction.amountInstallment = event
    }
  }

  buttonEmit(signal:string){
    this.signalButton.emit(signal)
  }



}
