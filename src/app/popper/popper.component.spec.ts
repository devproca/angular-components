import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopperComponent} from './popper.component';

describe('PopperComponent', () => {
  let component: PopperComponent;
  let fixture: ComponentFixture<PopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
