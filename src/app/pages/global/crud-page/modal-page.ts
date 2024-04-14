import { HttpErrorResponse } from "@angular/common/http";
import { MessagePageService } from "../../../services/message-page.service";
import { ModalEntity } from "../../../components/modal/modal.entity";

export abstract class ModalPage{
    constructor(protected messagePageService: MessagePageService) { }

    modal: ModalEntity = new ModalEntity();

    showModal(modal :ModalEntity){
        this.messagePageService.openModal(modal);
    }

    showMessageSaved(){
        this.messagePageService.openModalDefaultSave();
    }

    showErrorHTTP(error: HttpErrorResponse){
        this.messagePageService.openModalHttpErrorGeneric(error);
    }

    showMessageErrorGeneric(){
        this.messagePageService.openModalErrorGeneric();
    }

    showDeleteDefaultMessage(){
        this.messagePageService.showDeleteDefaultMessage();
    }
}