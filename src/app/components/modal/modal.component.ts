import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialogContent, 
  MatDialogActions, 
  MatDialogClose,
 }from "@angular/material/dialog"

 import{MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner'
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, MatProgressSpinnerModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  // @Input() title: string = 'Modal Title';
  // @Input() message: string = 'Modal Message';

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}
    ) {}


    closeDialog(){
      this.dialogRef.close('Pizza!')
    }

}
