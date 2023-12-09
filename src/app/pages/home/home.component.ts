import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { PaymentCardComponent } from "../../components/payment-card/payment-card.component";
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, MenuBarComponent, PaymentCardComponent, SideBarComponent, CardComponent]
})
export class HomeComponent {

}
