import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { FormsModule } from '@angular/forms';
import { EventualTransaction } from '../../../../entities/EventualTransaction';
import { FixedTransaction } from '../../../../entities/FixedTransaction';
import { Transactions } from '../../../../entities/Transactions';
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
  selectedDate?:Date;
  disabledFieldsUpdate:boolean = false;

  @Input()
  transaction?:Transactions;

 
  
  ngOnInit(): void {
    if(this.transaction === undefined || this.transaction === null){
      this.transaction = new Transactions();
      this.transaction.type = 'Expense';
      this.transaction.name = '';
    }else{
      this.disabledFieldsUpdate = true;
    }
  }

  save(){
    if(this.validateFields()){

    }else{

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
      || this.selectedDate < new Date()){
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
    if(this.transaction.name === '' 
    || this.transaction.name === undefined
    || this.transaction.name?.length > 50){
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
      }
    }
    // if(this.fixedTransaction.value === undefined
    //   || this.fixedTransaction.value === null
    //   || this.fixedTransaction.value < 1){
    //     this.fieldsError.set('fixedTransaction.value', true);
    //     return false;
    //   }
    const dataAtual = new Date()

    if(this.selectedDate != undefined){
      this.selectedDate = new Date(this.selectedDate);
    }
    if(this.selectedDate === undefined
      || this.selectedDate < dataAtual){
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
        return true;
      case 'Annual':
        return true;
      case 'Weekly':
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



}
