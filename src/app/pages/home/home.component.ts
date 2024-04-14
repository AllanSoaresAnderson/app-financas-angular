import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from "../../components/card/card.component";
import { PaymentCardComponent } from "../../components/payment-card/payment-card.component";
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { MenuTopComponent } from "../../components/menu-top/menu-top.component";
import { FlipCardComponent } from "../../components/flip-card/flip-card.component";
import { transition, trigger, state, style, animate} from '@angular/animations'

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, PaymentCardComponent, SideBarComponent, CardComponent, MatDialogModule, MenuTopComponent, FlipCardComponent],
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
export class HomeComponent{

    myState:string = 'active';
    aparecer:boolean = true;


    toggleState(){
        this.myState = this.myState === 'active'? 'inactive': 'active';
        this.aparecer = this.aparecer? false: true;
    }
}
