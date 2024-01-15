import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTopComponent } from './menu-top.component';

describe('MenuTopComponent', () => {
  let component: MenuTopComponent;
  let fixture: ComponentFixture<MenuTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
