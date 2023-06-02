import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonListAddComponent } from './button-list-add.component';

describe('ButtonListAddComponent', () => {
  let component: ButtonListAddComponent;
  let fixture: ComponentFixture<ButtonListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonListAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
