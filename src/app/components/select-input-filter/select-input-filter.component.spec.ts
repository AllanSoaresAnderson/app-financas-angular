import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputFilterComponent } from './select-input-filter.component';

describe('SelectInputComponent', () => {
  let component: SelectInputFilterComponent;
  let fixture: ComponentFixture<SelectInputFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectInputFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectInputFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
