import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router'
import { Router , IsActiveMatchOptions} from '@angular/router';


@Component({
  selector: 'app-side-bar-link',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './side-bar-link.component.html',
  styleUrl: './side-bar-link.component.css'
})
export class SideBarLinkComponent {
  constructor(private router: Router){ }
  @Input()
  icon: IconDefinition = faHouse;
  @Input()
  nameLink: string = "Home";
  @Input()
  link: string = "";


  routerLinkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored',
    paths: 'exact'
    };


  isLinkActive(path: string): boolean {
    //return this.router.isActive(path, true);
    return true
  }

}
