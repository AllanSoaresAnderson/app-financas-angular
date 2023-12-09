import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardModule } from './payment-card.module';
import { PageEvent } from '@angular/material/paginator';





@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule, PaymentCardModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
  @Input()
  resultList: string[] = ['Nome 1', 'Nome 2'];
  @Input()
  nameTable: string = 'Table';
  @Input() 
  listColumnNames: string[] = ['Coluna 1', 'Coluna 2'];

  pageSize:number = 5;
  pageEvent!: PageEvent;
  currentPage: number= 0;


  onChangePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // Atualize sua lista de resultados com base na página atual e no número de itens por página
    this.atualizarResultados();
  }

  atualizarResultados() {
    // Lógica para buscar os resultados com base na página atual e no número de itens por página
    // Isso dependerá da sua implementação específica.
  }





}
