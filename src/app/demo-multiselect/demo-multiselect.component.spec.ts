import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMultiselectComponent } from './demo-multiselect.component';

describe('DemoMultiselectComponent', () => {
  let component: DemoMultiselectComponent;
  let fixture: ComponentFixture<DemoMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
