import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideGroupComponent } from './slide-group.component';

describe('SlideGroupComponent', () => {
  let component: SlideGroupComponent;
  let fixture: ComponentFixture<SlideGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
