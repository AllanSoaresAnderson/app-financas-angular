import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Entities } from '../../../../models/Entities';
import { MaterialsModule } from '../../../../module/angular.material.module';
import { ModalComponent } from "../../../../components/modal/modal.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { RegistersService } from '../../services/registers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-form-entity',
  standalone: true,
  templateUrl: './form-entity.component.html',
  styleUrl: './form-entity.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 })),
      ]),
    ])
  ],
  imports: [FormsModule, SelectInputComponent, CommonModule, RouterModule, MaterialsModule, ModalComponent]
})
export class FormEntityComponent implements OnInit {
  constructor(private service: RegistersService) { }

  ngOnInit(): void {
    if (this.id != null) {
      this.typeOperation = 'update';
      this.getEntityById(this.id);
    }else{
      this.typeOperation = 'add';
      this.entity = new Entities();
    }
  }

  fieldsError: Map<string, boolean> = new Map();
  showComponent: string = 'main';
  openModal: boolean = false;
  typeModal: string = 'success-bottom';
  msgModal: string = 'An error has ocurred';
  entity: Entities = new Entities();

  @Input() typeOperation: string = 'add';
  @Input() id: number | null = null;
  @Output() signal: EventEmitter<string> = new EventEmitter();


  buttonEmit(signal: string) {
    this.signal.emit(signal)
  }

  save() {
    this.fieldsError = new Map();
    if (this.validateFields()) {
      this.showComponent = 'spinner';
      switch (this.typeOperation) {
        case 'add':
          this.entity.id = null;
          this.addNewEntity(this.entity);
          break;
        case 'update':
          this.updateEntity(this.entity);
          break;
      }


    }
  }

  validateFields(): boolean {
    if (!this.entity.name || this.entity.name.trim().length > 50 || this.entity.name.trim().length < 3) {
      this.fieldsError.set('entity.name', true);
      return false;
    }
    if (this.entity.isPerson != true && this.entity.isPerson != false) {
      this.fieldsError.set('entity.isPerson', true);
      return false;
    }
    return true
  }

  addNewEntity(entity: Entities) {
    this.service.addEntity(entity)
      .pipe(
        finalize(
          () => {
            this.showComponent = 'main';
          }
        )
      )
      .subscribe(
        {
          next: () => {
            this.signal.emit('saved');
          },
          error: (errorResponse: HttpErrorResponse) => {
            const statusCode = errorResponse.status;
            switch (statusCode) {
              case 500:
                this.msgModal = 'An error has ocurred. Internal Server error';
                break;
              case 400:
                this.msgModal = 'Error: Please check the information and try again'
                break;
              default:
                this.msgModal = 'An error has ocurred';
            }
            this.openModal = true;
          }
        }
      )
  }

  readSignalModal(event: string) {
    switch (event) {
      case 'close':
        this.openModal = false;
        break;
    }
  }

  getEntityById(id: number) {
    if (id) {
      this.showComponent = 'spinner';
      this.service.getEntityById(id).pipe(
        finalize(
          () => {
            this.showComponent = 'main';
          }
        )
      ).subscribe(
        {
          next: (entity: Entities) => {
            this.entity = entity;
          },
          error: (error: HttpErrorResponse) => {
            this.signal.emit(`[${error.status}] An error has ocurred`);
          }
        }
      )
    } else {
      this.signal.emit('cancel');
    }
  }

  updateEntity(entity: Entities) {
    this.service.updateEntity(entity).pipe(
      finalize(
        ()=>{
          this.showComponent = 'main';
        }
      )
    ).subscribe(
      {
        next:()=>{
          this.signal.emit('saved');
        },
        error:(error:HttpErrorResponse)=>{
          this.signal.emit(`[${error.status}] An error has ocurred`);
        }
      }
    )
  }


}
