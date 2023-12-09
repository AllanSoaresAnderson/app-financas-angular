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
    linkSelecionado: string = 'Contas';
    nameTable:string = 'Pagamentos';
    listTableColumnNames: string[] = ['Nome', 'Custos']
    listColumnNames: string[] = ['Faculdade', 'Carro', 'Luz', 'Água', 'Internet', 'Aluguel', 'Cartão']



    selecionarLink(link: string) {
        if (link === 'Entradas'){
            this.nameTable = 'Entradas'
            this.listTableColumnNames = ['Nome', 'Valor']
            this.listColumnNames = ['Salário']
        }
        else{
            this.nameTable = 'Pagamentos';
            this.listTableColumnNames = ['Nome', 'Custos']
            this.listColumnNames = ['Faculdade', 'Carro', 'Luz', 'Água', 'Internet', 'Aluguel', 'Cartão']
        
        }



        this.linkSelecionado = link;
    }

}
