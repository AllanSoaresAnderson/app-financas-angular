import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCheck, faPen, faSquareCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { CrudButtonsComponent } from "../buttons/crud-buttons/crud-buttons.component";
import { MessagePageService } from '../../services/message-page.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [CommonModule, FontAwesomeModule, CrudButtonsComponent]
})
export class ModalComponent implements OnInit, AfterViewInit {

  constructor(private messageService: MessagePageService) { }
  popupOpen: boolean = false;
  icon: IconDefinition = faCheck
  type: string = 'success-bottom';
  messageBody: string = 'Saved Successfully';

  popUpList: string[] = ['success-bottom', 'error-bottom'];

  ngOnInit(): void {
    this.messageService.popupState$.subscribe(
      modal => {
        this.type = modal.type
        this.messageBody = modal.messageBody
        this.popupOpen = modal.state;
        if(this.popupOpen) this.configView()
      }
    )
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
    if (this.popUpList.includes(this.type)) {
      setTimeout(() => {
        this.close()
      }, 2000);
    }
  }

  emitButtonClicked(message: string){
    this.messageService.emitButtonClicked(message);
  }

  close(){
    this.popupOpen = false;
  }

}
