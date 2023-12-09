import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar-perfil.component.html',
  styleUrl: './side-bar-perfil.component.css'
})
export class SideBarPerfilComponent {
  
  @Input()
  userName: string = 'Username';
  @Input()
  imagePath :string = 'https://vignette.wikia.nocookie.net/marvelmovies/images/8/87/AoU_Tony_Stark_portal.png/revision/latest?cb=20150427084736';

}
