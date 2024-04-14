import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrudButtonsComponent } from "../../../../components/buttons/crud-buttons/crud-buttons.component";
import { SelectInputFilterComponent } from "../../../../components/select-input-filter/select-input-filter.component";
import { CrudPage } from '../../../global/crud-page/crud-page';
import { FormTransactionComponent } from "../../forms/form-transaction/form-transaction.component";
import { ModalComponent } from "../../../../components/modal/modal.component";
import { RegistersService } from '../../services/registers.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialsModule } from '../../../../module/angular.material.module';
import { MessagePageService } from '../../../../services/message-page.service';

@Component({
    selector: 'app-transaction',
    standalone: true,
    templateUrl: './transaction.component.html',
    styleUrl: './transaction.component.css',
    animations: [
        trigger('btnState', [
            state('inactive', style({
                backgroundColor: 'red',
                transform: 'scale(1)',
            })),
            state('active', style({
                backgroundColor: 'blue',
                transform: 'scale(1.2)',
            })),
            transition('inactive => active', animate('2s ease-in')),
            transition('active => inactive', animate('0.5s ease-out')),
        ]),
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s', style({ opacity: 1 })),
            ]),
        ])
    ],
    imports: [CrudButtonsComponent, CommonModule, FormsModule, SelectInputFilterComponent, FormTransactionComponent, RouterModule, ModalComponent, MaterialsModule]
})
export class TransactionComponent extends CrudPage implements OnInit, AfterViewInit {
    constructor(
        private service: RegistersService,
        protected override messagePageService: MessagePageService) {
        super(messagePageService);
    }
    ngOnInit(): void {
        this.getList();
    }
    ngAfterViewInit(): void {
        
    }
    override currentPage: number = 0;
    override pageSize: number = 5;
    override lastPage: number = 100;

    filterName: string = '';
    filterDate: string = '';
    listTransactions: any[] = [];

    override getList(): void {
        this.isLoading = true;
        this.service.getListTransactionsScreenRegisters(this.currentPage, this.pageSize, this.filterName)
            .pipe(
                finalize(
                    () => {
                        this.isLoading = false;
                    }
                )
            )
            .subscribe(
                {
                    next: (value) => {
                        this.listTransactions = value.content
                        if (value.totalPages) {
                            this.lastPage = value.totalPages - 1;
                        }
                    },
                    error: (error: HttpErrorResponse) => {
                        this.showErrorHTTP(error)
                    }
                }
            )


    }

    override delete(id: number): void {
        this.isLoading = true;
        if (id) {
            this.service.deleteTransaction(id)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                        this.getList();
                        this.disablePage = false;
                    })
                )
                .subscribe(
                    {
                        error: (error: HttpErrorResponse) => {
                            switch (error.status) {
                                case 404:
                                    this.modal.type = 'error-bottom';
                                    this.modal.messageBody = 'Entity not found';
                                    this.showModal(this.modal);
                                    break;
                                default:
                                   this.showErrorHTTP(error);
                            }
                        }
                    }
                )
        }
    }

    // override update(id: number): void {
    //     this.idSelected = id;
    //     this.crudOptions('update');
    // }

}
