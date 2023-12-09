import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-registers',
    standalone: true,
    templateUrl: './registers.component.html',
    styleUrl: './registers.component.css',
    imports: [CommonModule, SideBarComponent, MenuBarComponent, CardComponent]
})
export class RegistersComponent {

}
