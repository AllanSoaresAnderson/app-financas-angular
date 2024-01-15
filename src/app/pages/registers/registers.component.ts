import { Component } from '@angular/core';
import { FormTransactionComponent } from "./forms/form-transaction/form-transaction.component";

@Component({
    selector: 'app-registers',
    standalone: true,
    templateUrl: './registers.component.html',
    styleUrl: './registers.component.css',
    imports: [FormTransactionComponent]
})
export class RegistersComponent {

}
