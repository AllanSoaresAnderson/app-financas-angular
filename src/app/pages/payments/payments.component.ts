import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-payments',
    standalone: true,
    templateUrl: './payments.component.html',
    styleUrl: './payments.component.css',
    imports: [CommonModule, CardComponent]
})
export class PaymentsComponent {

}
