import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
    selector: 'app-menu-bar',
    standalone: true,
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.css',
    imports: [CommonModule, SearchBarComponent]
})
export class MenuBarComponent {

}
