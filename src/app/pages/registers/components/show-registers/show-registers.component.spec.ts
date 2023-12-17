import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegistersComponent } from './show-registers.component';

describe('ShowRegistersComponent', () => {
  let component: ShowRegistersComponent;
  let fixture: ComponentFixture<ShowRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRegistersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
