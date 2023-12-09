import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarLinkComponent } from "../side-bar-link/side-bar-link.component";
import { SideBarPerfilComponent } from "../side-bar-perfil/side-bar-perfil.component";
import { IconDefinition, faHouse, faList, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-side-bar',
    standalone: true,
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css',
    imports: [CommonModule, SideBarLinkComponent, SideBarPerfilComponent, RouterModule]
})
export class SideBarComponent {
    constructor(){}

    listSideBarLinkTop:{name: string, link:string, icon: IconDefinition}[] = [
        { name: 'Home', link:'', icon : faHouse },
        { name: 'Cadastros', link:'/Cadastros', icon : faList},
    ];

    listSideBarLinkBottom: {name: string, link:string, icon: IconDefinition}[] = [
        { name: 'Ajuda', link:'/Ajuda', icon : faCircleInfo},
    ];

    userName: string = 'Allan Soares Anderson';




}
