/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormquestionComponent } from './formquestion.component';

describe('FormquestionComponent', () => {
  let component: FormquestionComponent;
  let fixture: ComponentFixture<FormquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
