export class ModalEntity{
    type: 'confirm-delete' | 'success-bottom' | 'error-bottom'  = 'success-bottom';
    messageBody: string = 'Saved Successfully';
    state: boolean = false;

    init(type: 'confirm-delete' | 'success-bottom' | 'error-bottom', messageBody: string){
        this.type = type;
        this.messageBody = messageBody;
        return this;
    }

    initWithState(type: 'confirm-delete' | 'success-bottom' | 'error-bottom', messageBody: string, state: boolean){
        this.type = type;
        this.messageBody = messageBody;
        this.state = state;
        return this;
    }
}