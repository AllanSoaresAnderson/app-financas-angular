import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarPerfilComponent } from './side-bar-perfil.component';

describe('SideBarPerfilComponent', () => {
  let component: SideBarPerfilComponent;
  let fixture: ComponentFixture<SideBarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
