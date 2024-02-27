import { Component, OnInit } from '@angular/core';
import { CrudButtonsComponent } from "../../../../components/buttons/crud-buttons/crud-buttons.component";
import { Transactions } from '../../../../models/Transactions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectInputFilterComponent } from "../../../../components/select-input-filter/select-input-filter.component";
import { FormTransactionComponent } from "../../forms/form-transaction/form-transaction.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-transaction',
    standalone: true,
    templateUrl: './transaction.component.html',
    styleUrl: './transaction.component.css',
    imports: [CrudButtonsComponent, CommonModule, FormsModule, SelectInputFilterComponent, FormTransactionComponent, RouterModule],
    animations:[
        trigger('btnState', [
            state('inactive', style(
                {
                    backgroundColor: 'red',
                    transform: 'scale(1)',
                }
            )),
            state('active', style(
                {
                    backgroundColor: 'blue',
                    transform: 'scale(1.2)',
                }
            )),
            transition('inactive => active', animate('2s ease-in')),
            transition('active => inactive', animate('0.5s ease-out')),
        ]),
        trigger('fadeInOut', [
            transition(':enter', [
              style({ opacity: 0 }),
              animate('1s', style({ opacity: 1 })),
            ]),
          ])
    ]
})
export class TransactionComponent implements OnInit{
    listTransactions: any[] = []
    filterDate:string = ''
    filterName:string = ''
    listFilterType: string[] = ['Everyone','Fixed', 'Eventual']
    listFilterEntity: string[] = ['Everyone','Me', 'House']
    filterTypeSelected:string = 'Filter by type...'
    filterEntitySelected:string = 'Filter by Entity...'
    crudState:string = 'read'




    ngOnInit(): void {
        const dateNow = new Date();
        dateNow.setDate(1); 
        this.filterDate = this.formatDate(dateNow);
       const transaction1:any = {};
       const transaction2:any = {};
        transaction1.name = 'Faculdade';
        transaction1.type = 'Eventual'
        transaction1.value = 200.39
        transaction1.entity = 'Me'
        transaction2.name = 'Aluguel';
        transaction2.type = 'Fixed'
        transaction2.value = 1200.39
        transaction2.entity = 'House'

       this.listTransactions.push(transaction1);
       this.listTransactions.push(transaction2);
    }



    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }



    crudOptions(option:string){
        this.crudState = option
    }

    readSignalButton(event:string){
        if(event === 'cancel'){
            this.crudState = 'read';
        }

    }

}
