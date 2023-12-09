import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-side-bar-link',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './side-bar-link.component.html',
  styleUrl: './side-bar-link.component.css'
})
export class SideBarLinkComponent {
  @Input()
  icon: IconDefinition = faHouse;
  @Input()
  nameLink: string = "Home";

}
