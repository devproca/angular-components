import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomComponentComponent } from './random-component.component';

describe('RandomComponentComponent', () => {
  let component: RandomComponentComponent;
  let fixture: ComponentFixture<RandomComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
