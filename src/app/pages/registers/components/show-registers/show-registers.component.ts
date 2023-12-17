import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { PaymentCardModule } from '../../../../components/payment-card/payment-card.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-show-registers',
  standalone: true,
  imports: [CommonModule, PaymentCardModule, FontAwesomeModule],
  templateUrl: './show-registers.component.html',
  styleUrl: './show-registers.component.css'
})
export class ShowRegistersComponent {
  @Input()
  title: string = 'Title';
  @Input()
  resultList: string[] = ['Name 1']

  @Output() newRegister:EventEmitter<string> = new EventEmitter();


  //Icon
  iconEdit: IconDefinition = faPen;
  iconAdd: IconDefinition = faPlus;
  iconDel: IconDefinition = faXmark;

  //Paginator
  pageSize:number = 7;
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

  addNewRegister(){
    this.newRegister.emit('add');
  }

}
