import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSpinnerComponent } from './demo-spinner.component';

describe('DemoSpinnerComponent', () => {
  let component: DemoSpinnerComponent;
  let fixture: ComponentFixture<DemoSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
