import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChipComponent } from './demo-chip.component';

describe('DemoChipComponent', () => {
  let component: DemoChipComponent;
  let fixture: ComponentFixture<DemoChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
