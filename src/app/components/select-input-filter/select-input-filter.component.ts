import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-input-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input-filter.component.html',
  styleUrl: './select-input-filter.component.css'
})
export class SelectInputFilterComponent {
  constructor(private elRef: ElementRef) {}

  optionsOpened:boolean = false;
  @Input()
  selectedField:string = 'Choose';
  @Output() 
  selectedFieldChange: EventEmitter<string>= new EventEmitter();
  @Input()
  listOptions: string[] = ['First option', 'Second Option'];
  @Input()
  disabled:boolean = false;
  @Input()
  error:boolean = false;
  @Input()
  errorMsg:string = 'error';



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
