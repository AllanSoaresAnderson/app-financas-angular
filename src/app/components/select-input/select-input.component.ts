import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css'
})
export class SelectInputComponent {
  constructor(private elRef: ElementRef) {}

  optionsOpened:boolean = false;
  @Input()
  disabled:boolean = false;
  @Input()
  error:boolean = false;
  @Input()
  errorMsg:string = 'error';
  @Input() listOptions:any[]= ['Choose'];
  @Input() selectedField:any = {"name":"Choose", "id": null};
  @Input() fieldDisplayed: string = 'name';
  @Input() showsItUp : boolean = false;
  @Output() selectedFieldChange: EventEmitter<any> = new EventEmitter();
  




  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      if (this.optionsOpened) {
        this.optionsOpened = false;
      }
    }
  }

  openOptions(){
    this.optionsOpened = !this.optionsOpened;
  }

  selectOption(option:any){
    this.selectedField = option;
    this.selectedFieldChange.emit(option);
    this.openOptions();
  }
}
