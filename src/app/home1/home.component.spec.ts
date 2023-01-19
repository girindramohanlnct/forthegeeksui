import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1Component } from './home.component';

describe('HomeComponent', () => {
  let component: Home1Component;
  let fixture: ComponentFixture<Home1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
