import { Router } from "@angular/router";
import { MessagePageService } from "../../../services/message-page.service";
import { ModalPage } from "./modal-page";

export abstract class FormPage extends ModalPage {
    constructor(
        protected override messagePageService: MessagePageService,
        protected router: Router) {
        super(messagePageService);
    }

    abstract id: number | null;
    abstract pathReturn: string;
    isEditing: boolean = false;
    isLoading: boolean = false;

    fieldsError: Map<string, boolean> = new Map();
    disabledFieldsUpdate: boolean = false;

    verifyUpdateOrCreate() {
        if (this.id != null) {
            this.isEditing = true;
            this.getById();
        } else {
            this.isEditing = false;
            this.configPageAdd();
        }
    }

    save() {
        this.fieldsError = new Map();
        if (this.validateFields()) {
            this.isLoading = true;
            this.isEditing ? this.update() : this.add() ;
        }
    }

    abstract validateFields(): boolean;
    abstract add(): void;
    abstract update(): void;
    abstract getById(): void;
    abstract cleanRegister(): void;
    abstract configPageAdd(): void;
    
    redirect(path: string): void{
        this.router.navigate([path]);
    }

    return(){
        this.redirect(this.pathReturn);
    }


}