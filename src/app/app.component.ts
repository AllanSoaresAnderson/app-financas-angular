import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuTopComponent } from "./components/menu-top/menu-top.component";
import { ModalComponent } from "./components/modal/modal.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HomeComponent, FontAwesomeModule, RouterLink, RouterLinkActive, SideBarComponent, NgbModule, MenuTopComponent, ModalComponent]
})
export class AppComponent {
  title = 'Finances';
  faCoffee = faCoffee;
}
