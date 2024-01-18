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
  selectedField:string = 'Choose';
  @Output() 
  selectedFieldChange: EventEmitter<string>= new EventEmitter();
  @Input()
  listOptions: string[] = ['First option', 'Second Option']
  




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

  selectOption(option:string){
    this.selectedField = option;
    this.selectedFieldChange.emit(option);
    this.openOptions();
  }

}
