import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCheck, faPen, faSquareCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { CrudButtonsComponent } from "../buttons/crud-buttons/crud-buttons.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [CommonModule, FontAwesomeModule, CrudButtonsComponent]
})
export class ModalComponent implements OnInit, AfterViewInit {

  icon: IconDefinition = faCheck

  @Input() type: string = 'success-bottom';
  @Input() messageBody: string = 'Saved Successfully';
  @Output() signal: EventEmitter<string> = new EventEmitter();

  popUpList: string[] = ['success-bottom', 'error-bottom'];

  ngOnInit(): void {
    this.configView()
    if (this.popUpList.includes(this.type)) {
      setTimeout(() => {
        this.buttonEmit('close');
      }, 2000);
    }
  }

  ngAfterViewInit(): void {

  }


  configView() {
    switch (this.type) {
      case 'success-bottom':
        this.icon = faCheck;
        break;
      case 'error-bottom':
        this.icon = faTriangleExclamation;
        break;
      case 'confirm-delete':
        this.icon = faTriangleExclamation;
        break;
      default:
        this.icon = faCheck;
    }
  }


  buttonEmit(msg: string){
    this.signal.emit(msg)
  }


}
