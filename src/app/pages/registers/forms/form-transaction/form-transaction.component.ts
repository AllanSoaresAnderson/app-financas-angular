import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { Entities } from '../../../../models/Entities';
import { EventualTransaction } from '../../../../models/EventualTransaction';
import { FixedTransaction } from '../../../../models/FixedTransaction';
import { Transactions } from '../../../../models/Transactions';
import { MessagePageService } from '../../../../services/message-page.service';
import { FormPage } from '../../../global/crud-page/form-page';
import { RegistersService } from '../../services/registers.service';

@Component({
  selector: 'app-form-transaction',
  standalone: true,
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.css',
  imports: [CommonModule, SelectInputComponent, FormsModule, RouterModule],
})
export class FormTransactionComponent extends FormPage implements OnInit {
  override pathReturn: string = '/transactions';

  constructor(
    private service: RegistersService,
    private route: ActivatedRoute,
    protected override router: Router,
    protected override messagePageService: MessagePageService) { super(messagePageService, router) }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.id = params['id'];
      } else {
        this.isEditing = false;
        this.selectedDate = this.formatDate(new Date());
      }
      this.verifyUpdateOrCreate();
    });
  }

  @Input() override id: number | null = null;

  transaction: Transactions = new Transactions();
  selectedDate: string = '';
  totalValue: number = 0;

  listTransactionType: string[] = ['Expense', 'Earning']
  listOptionsTypeFixedTransaction: string[] = ['Monthly', 'Annual', 'Weekly', 'Amount of Years', 'Amount of Months', 'Amount of Weeks', 'Amount of Days']
  listOptionsCategory: string[] = ['Fixed', 'Eventual'];
  listEntities: Entities[] = [];

  fieldsDisable: Map<string, boolean> = new Map();


  override validateFields(): boolean {
    this.constructTransaction();
    if (!this.validateFieldsTransaction()) {
      return false;
    }
    if (this.transaction.categoryType === 'Fixed'
      && !this.validateFieldsFixedTransaction()) {
      return false;
    }
    if (this.transaction.categoryType === 'Eventual'
      && !this.validateFieldsEventualTransaction()) {
      return false;
    }
    return true;
  }

  override add(): void {
    this.service.addTransaction(this.transaction).subscribe(
      {
        next: () => { this.showMessageSaved() },
        error: (errorResponse: HttpErrorResponse) => { this.showErrorHTTP(errorResponse) }
      }
    )
  }

  override update(): void {

  }

  override getById(): void {
    this.disabledFieldsUpdate = true;
    if (this.id) {
      // this.showComponent = 'spinner';
      this.isLoading = true;
      this.service.getTransactionById(this.id)
        .pipe(
          finalize(
            () => {
              this.isLoading = false;
            }
          )
        )
        .subscribe(
          {
            next: (transaction: Transactions) => { this.transaction = transaction },
            error: (error: HttpErrorResponse) => { this.showErrorHTTP(error) }
          }
        )
    } else { this.showMessageErrorGeneric() }
  }

  override cleanRegister(): void {
    this.transaction = new Transactions();
    this.transaction.type = 'Expense';
    this.transaction.fixedTransaction = new FixedTransaction();
    this.transaction.eventualTransaction = new EventualTransaction();
    this.transaction.entity = new Entities();
    this.disabledFieldsUpdate = false;
  }

  validateFieldsEventualTransaction(): boolean {
    if (this.selectedDate === undefined
      || new Date(this.selectedDate) < new Date()) {
      this.transaction.eventualTransaction.date = new Date(this.selectedDate);
      this.fieldsError.set('selectedDate', true);
      return false;
    }
    if (this.totalValue < 1) {
      this.transaction.fixedTransaction.value = this.totalValue
      this.fieldsError.set('totalValue', true);
      return false;
    }
    return true;
  }

  validateFieldsTransaction(): boolean {
    if (this.transaction.type !== 'Expense' && this.transaction.type !== 'Earning') {
      this.fieldsError.set('transaction.type', true);
      return false;
    }
    if (this.transaction.categoryType !== 'Fixed' && this.transaction.categoryType !== 'Eventual') {
      this.fieldsError.set('transaction.categoryType', true);
      return false;
    }
    this.transaction.name = this.transaction.name.trim()
    if (!this.transaction.name || this.transaction.name?.length > 50) {
      this.fieldsError.set('transaction.name', true);
      return false;
    }
    return true;
  }

  validateFieldsFixedTransaction(): boolean {
    if (!this.validateTypeFixedTransaction()) {
      return false;
    } else {
      if (
        (this.transaction.fixedTransaction.type === 'Amount of Years'
          || this.transaction.fixedTransaction.type === 'Amount of Months'
          || this.transaction.fixedTransaction.type === 'Amount of Weeks'
          || this.transaction.fixedTransaction.type === 'Amount of Days')
        &&
        (this.transaction.fixedTransaction.amountTime === null
          || this.transaction.fixedTransaction.amountTime < 1)
      ) {
        this.fieldsError.set('fixedTransaction.amountTime', true);
        return false;
      }
    }
    if (this.transaction.fixedTransaction.isInstallment !== true && this.transaction.fixedTransaction.isInstallment !== false) {
      this.fieldsError.set('fixedTransaction.isInstallment', true);
      return false;
    } else {
      if (this.transaction.fixedTransaction.isInstallment) {
        if (this.transaction.fixedTransaction.amountInstallment === null
          || this.transaction.fixedTransaction.amountInstallment < 2) {
          this.fieldsError.set('fixedTransaction.amountInstallment', true);
          return false;
        }
      } else {
        this.transaction.fixedTransaction.amountInstallment = null;
      }
    }
    if (this.selectedDate === undefined
      || new Date(this.selectedDate) < new Date()) {
      this.fieldsError.set('selectedDate', true);
      return false;
    }
    this.transaction.fixedTransaction.startDate = new Date(this.selectedDate)
    if (this.totalValue < 1) {
      this.fieldsError.set('totalValue', true);
      return false;
    }
    this.transaction.fixedTransaction.value = this.totalValue;
    return true;
  }

  validateTypeFixedTransaction(): boolean {
    switch (this.transaction.fixedTransaction.type) {
      case 'Monthly':
        this.transaction.fixedTransaction.amountTime = 1;
        return true;
      case 'Annual':
        this.transaction.fixedTransaction.amountTime = 1;
        return true;
      case 'Weekly':
        this.transaction.fixedTransaction.amountTime = 1;
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
  }

  formatDate(newDate: Date): string {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth();
    const date = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
    return `${year}-${month}-${date}`
  }

  constructTransaction() {
    this.transaction.idEntity = this.transaction.entity.id;
    if (this.transaction.categoryType === 'Fixed') {
      this.transaction.idCategory = this.transaction.fixedTransaction.id
    } else {
      this.transaction.idCategory = this.transaction.eventualTransaction.id
    }
  }
  /**
   * Function to return a list of entities
   * @returns {Promise<Entities[]>} - A Promise with a list of entities
   */
  getEntities(): Promise<Entities[]> {
    return new Promise<Entities[]>((resolve, reject) => {
      this.service.getEntities().subscribe(
        {
          next: (entities: Entities[]) => { resolve(entities) },
          error: (error: HttpErrorResponse) => { reject(error) }
        }
      )
    }
    );
  }
  /**
   * Function to configure the registration page for new registrations
   */
  override async configPageAdd(): Promise<void> {
    this.isLoading = true;
    this.cleanRegister();
    await this.getEntities()
      .then((listEntities: Entities[]) => {
        if (!listEntities.length) {
          const entity = new Entities();
          entity.name = 'Register an Entity';
          listEntities = [entity]
          this.transaction.entity = entity;
          this.fieldsDisable.set('transaction.entity', true);
        }
        this.listEntities = listEntities;
      })
      .catch((error: HttpErrorResponse) => this.showErrorHTTP(error));
      this.isLoading = false;
  }



}

