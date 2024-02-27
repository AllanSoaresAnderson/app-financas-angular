import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCaretLeft, faCaretRight, faFloppyDisk, faForward, faMagnifyingGlass, faPen, faPlus, faRotateForward, faRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crud-buttons',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './crud-buttons.component.html',
  styleUrl: './crud-buttons.component.css'
})
export class CrudButtonsComponent implements OnInit {
  ngOnInit(): void {
    this.selectIcons()

  }
  icon: IconDefinition = faPen
  @Input() type: string = 'Edit'
  @Input() disable: boolean = false;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter();
  


  selectIcons() {
    switch (this.type) {
      case 'Edit':
        this.icon = faPen
        break;
      case 'Add':
        this.icon = faPlus
        break;
      case 'Delete':
        this.icon = faXmark
        break;
      case 'Save':
        this.icon = faFloppyDisk
        break;
      case 'Last Page':
        this.icon = faForward
        break;
      case 'Next Page':
        this.icon = faCaretRight
        break;
      case 'Previous Page':
        this.icon = faCaretLeft
        break;
      case 'Home Page':
        this.icon = faForward
        break;
      case 'return':
        this.icon = faRotateLeft
        break;
      case 'search':
        this.icon = faMagnifyingGlass
        break;
      default:
        this.icon = faRotateLeft
    }

  }

  onClicked() {
    this.clicked.emit(true);
  }


}
