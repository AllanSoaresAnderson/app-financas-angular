import { MessagePageService } from "../../../services/message-page.service";
import { ModalPage } from "./modal-page";

export abstract class CrudPage extends ModalPage{
    abstract currentPage: number;
    abstract pageSize: number;
    abstract lastPage: number;

    idSelected: number | null = null;
    disablePage: boolean = false;
    isLoading: boolean = false;

    constructor(protected override messagePageService: MessagePageService) {
        super(messagePageService);
    }

    abstract getList(): void;
    abstract delete(id: number): void;


    openConfirmModal(type: string, id: number) {
        switch (type) {
            case 'delete':
                this.idSelected = id;
                this.disablePage = true;
                this.showDeleteDefaultMessage();
                this.observeConfirmModal();
                break;
        }
    }

    observeConfirmModal(){
        this.messagePageService.buttonEmit$.subscribe(
            {
                next: (message: string) => {
                    this.readSignalModal(message);
                    this.messagePageService.closeModal();
                }
            }
        )
    }

    readSignalModal(event: string) {
        switch (event) {
            case 'close':
                this.disablePage = false;
                break;
            case 'confirm':
                if (this.idSelected)
                    this.delete(this.idSelected);
                break;
        }
    }

    nextPage(): void {
        if (this.currentPage < this.lastPage)
            this.currentPage++;
        this.getList();
    }

    previousPage(): void {
        if (this.currentPage > 0)
            this.currentPage--;
        this.getList();
    }

    startPage(): void {
        this.currentPage = 0;
        this.getList();
    }

    endPage(): void {
        this.currentPage = this.lastPage
        this.getList()
    }

}