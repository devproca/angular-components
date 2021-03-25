import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSlideToggleComponent } from './demo-slide-toggle.component';

describe('DemoSlideToggleComponent', () => {
  let component: DemoSlideToggleComponent;
  let fixture: ComponentFixture<DemoSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoSlideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
