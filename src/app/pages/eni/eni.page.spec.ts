import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EniPage } from './eni.page';

describe('EniPage', () => {
  let component: EniPage;
  let fixture: ComponentFixture<EniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EniPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
