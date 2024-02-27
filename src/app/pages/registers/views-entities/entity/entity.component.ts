import { Component } from '@angular/core';
import { CrudButtonsComponent } from "../../../../components/buttons/crud-buttons/crud-buttons.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectInputFilterComponent } from "../../../../components/select-input-filter/select-input-filter.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { FormEntityComponent } from "../../forms/form-entity/form-entity.component";
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../../../../module/angular.material.module';
import { ModalComponent } from "../../../../components/modal/modal.component";
import { Entities } from '../../../../models/Entities';
import { RegistersService } from '../../services/registers.service';
import { Observable, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
export class EntityComponent {
    constructor(private service: RegistersService) {
        this.getListEntities()
    }

    isLoading: boolean = true;
    openModal: boolean = false;
    disablePage: boolean = false;
    filterType: boolean | null = null;

    typeModal: string = 'success-bottom';
    msgModal: string = 'Saved Successfully';
    crudState: string = 'read';
    filterName: string = '';

    idEntitySelected: number | null = null;
    currentPage: number = 0;
    pageSize: number = 5;
    lastPage: number = 100;

    listEntities: any[] = [];

    crudOptions(option: string) {
        switch (option) {
            case 'add':
                this.idEntitySelected = null;
                break;
        }
        this.crudState = option
    }

    readSignalForm(event: string) {
        switch (event) {
            case 'cancel':
                this.crudState = 'read';
                break;
            case 'saved':
                this.disablePage = true;
                this.crudState = 'read';
                this.getListEntities();
                this.typeModal = 'success-bottom'
                this.msgModal = 'Saved Successfully'
                this.openModal = true;
                break;
            default:
                this.msgModal = event;
                this.typeModal = 'error-bottom'
                this.openModal = true;
        }
    }

    readSignalModal(event: string) {
        switch (event) {
            case 'close':
                this.openModal = false;
                this.disablePage = false;
                break;
            case 'confirm':
                this.openModal = false;
                if (this.idEntitySelected)
                    this.deleteEntity(this.idEntitySelected);
                break;
        }
    }

    getListEntities() {
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
                }, error: () => {
                    this.typeModal = 'error-bottom';
                    this.msgModal = 'An error has ocurred';
                    this.openModal = true;
                }
            }
        )
    }

    deleteEntity(id: number) {
        this.isLoading = true;
        if (id) {
            this.service.deleteEntity(id).pipe(
                finalize(
                    () => {
                        this.isLoading = false;
                        this.getListEntities();
                        this.disablePage = false;
                    }
                )
            ).subscribe(
                {
                    error: (error: HttpErrorResponse) => {
                        this.typeModal = 'error-bottom';
                        switch (error.status) {
                            case 500:
                            case 400:
                                this.msgModal = 'An error has ocurred';
                                break;
                            case 404:
                                this.msgModal = 'Entity not found';
                                break;
                            default:
                                this.msgModal = 'An error has ocurred';
                        }

                        this.openModal = true;
                    }
                }
            )
        }
    }

    updateEntity(id: number) {
        this.idEntitySelected = id;
        this.crudOptions('update');
    }

    openConfirmModal(type: string, id: number) {
        switch (type) {
            case 'delete':
                this.disablePage = true;
                this.msgModal = "Do you really want to delete it? It's an irreversible action!"
                this.typeModal = 'confirm-delete'
                this.openModal = true;
                this.idEntitySelected = id;
                break;
        }
    }

    nextPage(): void {
        if (this.currentPage < this.lastPage)
            this.currentPage++;
        this.getListEntities();
    }

    previousPage(): void {
        if (this.currentPage > 0)
            this.currentPage--;
        this.getListEntities();
    }

    startPage(): void {
        this.currentPage = 0;
        this.getListEntities();
    }

    endPage(): void {
        this.currentPage = this.lastPage
        this.getListEntities()
    }



}
