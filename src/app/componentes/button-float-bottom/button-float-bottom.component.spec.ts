import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFloatBottomComponent } from './button-float-bottom.component';

describe('ButtonFloatBottomComponent', () => {
  let component: ButtonFloatBottomComponent;
  let fixture: ComponentFixture<ButtonFloatBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFloatBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFloatBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
