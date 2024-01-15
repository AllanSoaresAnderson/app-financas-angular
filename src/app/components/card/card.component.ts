import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardComponent } from "../payment-card/payment-card.component";
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [CommonModule, PaymentCardComponent],
})
export class CardComponent implements OnInit{
    constructor(private earningService: DataService){}
    
    ngOnInit(): void {
        this.getListEarnings()
    }


    linkSelecionado: string = 'Entradas';
    nameTable:string = 'Entradas';
    listTableColumnNames: string[] = ['Nome', 'Valor']
    resultList: string[] = ['Result list 1']


    selecionarLink(link: string) {
        if (link === 'Entradas'){
            this.nameTable = 'Entradas'
            this.listTableColumnNames = ['Nome', 'Valor']
            this.getListEarnings()
        }
        else{
            this.nameTable = 'Pagamentos';
            this.listTableColumnNames = ['Nome', 'Custos']
            this.getListExpenses()
        
        }
        this.linkSelecionado = link;
    }



    getListEarnings(){
        this.earningService.getListEarnings().subscribe(
            (response) => {
                this.resultList = response
            },
            (error) => {
                console.error(error);
              } 
            )
    }

    getListExpenses(){
        this.earningService.getListExpenses().subscribe(
            (response) => {
                this.resultList = response
            },
            (error) => {
                console.error(error);
              } 
            )
    }
}
