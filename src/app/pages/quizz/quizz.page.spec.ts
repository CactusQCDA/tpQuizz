import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzPage } from './quizz.page';

describe('QuizzPage', () => {
  let component: QuizzPage;
  let fixture: ComponentFixture<QuizzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
