import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCoins } from '@fortawesome/free-solid-svg-icons';
import {RouterModule} from '@angular/router'

@Component({
  selector: 'app-flip-card',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './flip-card.component.html',
  styleUrl: './flip-card.component.css'
})
export class FlipCardComponent {
  
  @Input()
  icon:IconDefinition = faCoins
  @Input()
  title:string = 'Costs'
  @Input()
  description:string = "Let's to register a new costs?"
  @Input()
  nameButton:string = 'Register'
  @Input()
  link: string = '/Registers'


}
