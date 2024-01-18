import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";

@Component({
    selector: 'app-form-entity',
    standalone: true,
    templateUrl: './form-entity.component.html',
    styleUrl: './form-entity.component.css',
    imports: [FormsModule, SelectInputComponent]
})
export class FormEntityComponent {
  isPerson:boolean = false;

}
