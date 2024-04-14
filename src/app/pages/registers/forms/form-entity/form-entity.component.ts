import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectInputComponent } from "../../../../components/select-input/select-input.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Entities } from '../../../../models/Entities';
import { MaterialsModule } from '../../../../module/angular.material.module';
import { ModalComponent } from "../../../../components/modal/modal.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { RegistersService } from '../../services/registers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { FormPage } from '../../../global/crud-page/form-page';
import { MessagePageService } from '../../../../services/message-page.service';


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
export class FormEntityComponent extends FormPage implements OnInit {
  constructor(
    private service: RegistersService,
    protected override messagePageService: MessagePageService,
    private route: ActivatedRoute,
    protected override router: Router
  ) { super(messagePageService, router); }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) this.id = params['id'];
      this.verifyUpdateOrCreate();
    });
  }
  
  override id: number | null = null;
  entity: Entities = new Entities();
  override pathReturn: string = '/entities';


  override validateFields(): boolean {
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

  override add(): void {
    this.isLoading = true;
    this.service.addEntity(this.entity)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe(
        {
          next: () => {
            this.showMessageSaved();
            this.return();
          },
          error: (error: HttpErrorResponse) => {
            this.messagePageService.openModalHttpErrorGeneric(error);
            this.return();
          }
        }
      )
  }

  override update(): void {
    this.service.updateEntity(this.entity)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe(
        {
          next: () => {
            this.showMessageSaved();
            this.return();
          },
          error: (error: HttpErrorResponse) => {
            this.messagePageService.openModalHttpErrorGeneric(error);
            this.return();
          }
        }
      )
  }

  override getById(): void {
    if (this.id) {
      this.service.getEntityById(this.id!)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe(
          {
            next: (entity: Entities) => { this.entity = entity; },
            error: (error: HttpErrorResponse) => {
              this.messagePageService.openModalHttpErrorGeneric(error);
              this.return();
            }
          }
        )
    } else {
      this.showMessageErrorGeneric();
      this.return();
    }
  }

  override cleanRegister(): void {
    this.entity = new Entities();
  }

  override configPageAdd(): void {
    this.cleanRegister();
  }

}
