import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalEntity } from '../components/modal/modal.entity';
import { DefaultMessage } from '../utils/enum/message';

@Injectable({
  providedIn: 'root'
})
export class MessagePageService {
  private popupStateSubject = new Subject<ModalEntity>();
  popupState$ = this.popupStateSubject.asObservable();

  private buttonEmitSubject = new Subject<string>();
  buttonEmit$ = this.buttonEmitSubject.asObservable();

  constructor() { }

  openModal(modal : ModalEntity) {
    modal.state = true;
    this.popupStateSubject.next(modal);
  }

  closeModal() {
    const modal = new ModalEntity();
    modal.state = false
    this.popupStateSubject.next(modal);
  }

  emitButtonClicked(message: string){
    this.buttonEmitSubject.next(message);
  }
  openModalHttpErrorGeneric(error: HttpErrorResponse){
      const msg = `[${error.status}] ${DefaultMessage.GENERIC_ERROR}`;
      this.openModal(new ModalEntity().init('error-bottom', msg));
  }

  openModalDefaultSave(){
    this.openModal(new ModalEntity().init('success-bottom', DefaultMessage.SAVED))
  }

  openModalErrorGeneric(){
    this.openModal(new ModalEntity().init('success-bottom', DefaultMessage.GENERIC_ERROR))
  }

  showDeleteDefaultMessage(){
    this.openModal(new ModalEntity().init('confirm-delete', DefaultMessage.DELETE_QUESTION))
}


}
