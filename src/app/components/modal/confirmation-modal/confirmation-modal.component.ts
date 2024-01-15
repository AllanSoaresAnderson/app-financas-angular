import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { faTriangleExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



export interface ConfirmationModalData {
  title: string;
  warningText: string;
  confirmButton:string,
  denyButton:string,
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, FontAwesomeModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModalData
  ){}

  icon:IconDefinition = faTriangleExclamation;

}




