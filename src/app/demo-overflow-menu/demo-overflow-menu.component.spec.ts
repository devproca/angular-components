import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoOverflowMenuComponent} from './demo-overflow-menu.component';

describe('DemoOverflowMenuComponent', () => {
  let component: DemoOverflowMenuComponent;
  let fixture: ComponentFixture<DemoOverflowMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoOverflowMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoOverflowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
