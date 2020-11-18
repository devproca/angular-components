import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDatePickerComponent } from './demo-date-picker.component';

describe('DemoDatePickerComponent', () => {
  let component: DemoDatePickerComponent;
  let fixture: ComponentFixture<DemoDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
