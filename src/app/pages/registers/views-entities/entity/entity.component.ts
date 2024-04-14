import { AfterViewInit, Component } from '@angular/core';
import { CrudButtonsComponent } from "../../../../components/buttons/crud-buttons/crud-buttons.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectInputFilterComponent } from "../../../../components/select-input-filter/select-input-filter.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { FormEntityComponent } from "../../forms/form-entity/form-entity.component";
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../../../../module/angular.material.module';
import { ModalComponent } from "../../../../components/modal/modal.component";
import { RegistersService } from '../../services/registers.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudPage } from '../../../global/crud-page/crud-page';
import { MessagePageService } from '../../../../services/message-page.service';

@Component({
    selector: 'app-entity',
    standalone: true,
    templateUrl: './entity.component.html',
    styleUrl: './entity.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s', style({ opacity: 1 })),
            ]),
        ]),
        trigger('modalInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('150ms', style({ opacity: 1 })),
            ]),
        ])
    ],
    imports: [CrudButtonsComponent, CommonModule, FormsModule, SelectInputFilterComponent, FormEntityComponent, RouterModule, MaterialsModule, ModalComponent]
})
export class EntityComponent extends CrudPage implements AfterViewInit{  
    constructor(
        private service: RegistersService,
        protected override messagePageService: MessagePageService) {
        super(messagePageService);    
    }

    ngAfterViewInit(): void {
        this.getList()
    }

    override currentPage: number = 0;
    override pageSize: number = 5;
    override lastPage: number = 100;
    filterType: boolean | null = null;
    filterName: string = '';
    listEntities: any[] = [];

    getList():void {
        this.service.getListEntitiesScreenRegisters(this.currentPage, this.pageSize, this.filterType, this.filterName).pipe(
            finalize(
                () => { this.isLoading = false }
            )
        ).subscribe(
            {
                next: (value) => {
                    this.listEntities = value.content;
                    if (value.totalPages) {
                        this.lastPage = value.totalPages - 1;
                    }
                }, error: (error: HttpErrorResponse) => {
                    this.showErrorHTTP(error);
                }
            }
        )
    }

    delete(id: number) {
        this.isLoading = true;
        this.disablePage = true;
        if (id) {
            this.service.deleteEntity(id).pipe(
                finalize(
                    () => {
                        this.isLoading = false;
                        this.getList();
                        this.disablePage = false;
                    }
                )
            ).subscribe(
                {
                    error: (error: HttpErrorResponse) => {
                        switch (error.status) {
                            case 404:
                                this.modal.type = 'error-bottom';
                                this.modal.messageBody = 'Entity not found';
                                break;
                            default:
                                this.showErrorHTTP(error);
                        }
                    }
                }
            )
        }
    }


}
