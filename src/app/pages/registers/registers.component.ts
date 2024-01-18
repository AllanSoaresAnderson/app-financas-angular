import { Component } from '@angular/core';
import { FlipCardComponent } from "../../components/flip-card/flip-card.component";
import { transition, trigger, state, style, animate} from '@angular/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCoins, faUserGroup, faShop } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-registers',
    standalone: true,
    templateUrl: './registers.component.html',
    styleUrl: './registers.component.css',
    imports: [FlipCardComponent, FontAwesomeModule],
    animations:[
      trigger('btnState', [
          state('inactive', style(
              {
                  backgroundColor: 'red',
                  transform: 'scale(1)',
              }
          )),
          state('active', style(
              {
                  backgroundColor: 'blue',
                  transform: 'scale(1.2)',
              }
          )),
          transition('inactive => active', animate('2s ease-in')),
          transition('active => inactive', animate('0.5s ease-out')),
      ]),
      trigger('fadeInOut', [
          transition(':enter', [
            style({ opacity: 0 }),
            animate('1s', style({ opacity: 1 })),
          ]),
          transition(':leave', [
            animate('1s', style({ opacity: 0 })),
          ]),
        ])
  ]
})
export class RegistersComponent {
  myState:string = 'active';
  listIcons: IconDefinition[] = [faCoins, faUserGroup, faShop];


  toggleState(){
      this.myState = this.myState === 'active'? 'inactive': 'active';
  }
}
