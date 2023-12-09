import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
  @Input()
  listColumnNames: string[] = ['Nome 1', 'Nome 2']
  @Input()
  nameTable: string = 'Table';
  @Input() 
  listTableColumnNames: string[] = ['Coluna 1', 'Coluna 2']
}
