import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";

@Component({
    selector: 'app-form-transaction',
    standalone: true,
    templateUrl: './form-transaction.component.html',
    styleUrl: './form-transaction.component.css',
    imports: [CommonModule, SelectInputComponent]
})
export class FormTransactionComponent implements OnInit {

  listOptionsCategory = ['Fixed', 'Eventual'];
  
  ngOnInit(): void {
  }

}
