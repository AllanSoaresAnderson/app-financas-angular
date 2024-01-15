import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';

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
    this.openOptions()
  }

}
