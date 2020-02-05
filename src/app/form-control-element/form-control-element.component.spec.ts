import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlElementComponent } from './form-control-element.component';

describe('FormControlElementComponent', () => {
  let component: FormControlElementComponent;
  let fixture: ComponentFixture<FormControlElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
