import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarLinkComponent } from "../side-bar-link/side-bar-link.component";
import { SideBarPerfilComponent } from "../side-bar-perfil/side-bar-perfil.component";

@Component({
    selector: 'app-side-bar',
    standalone: true,
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css',
    imports: [CommonModule, SideBarLinkComponent, SideBarPerfilComponent]
})
export class SideBarComponent {

    listSideBarLinkTop: string[] = ["Home","Cadastros"]
    listSideBarLinkBottom: string[] = ["Ajuda"]
    userName: string = 'Allan Soares Anderson';

}
