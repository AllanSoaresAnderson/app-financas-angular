import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardComponent } from "../payment-card/payment-card.component";

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [CommonModule, PaymentCardComponent]
})
export class CardComponent {
    linkSelecionado: string = 'Entradas';
    nameTable:string = 'Entradas';
    listTableColumnNames: string[] = ['Nome', 'Valor']
    resultList: string[] = ['Salário']



    selecionarLink(link: string) {
        if (link === 'Entradas'){
            this.nameTable = 'Entradas'
            this.listTableColumnNames = ['Nome', 'Valor']
            this.resultList = ['Salário']
        }
        else{
            this.nameTable = 'Pagamentos';
            this.listTableColumnNames = ['Nome', 'Custos']
            this.resultList = ['Faculdade', 'Carro', 'Luz', 'Água', 'Internet', 'Aluguel', 'Cartão']
        
        }



        this.linkSelecionado = link;
    }

}
