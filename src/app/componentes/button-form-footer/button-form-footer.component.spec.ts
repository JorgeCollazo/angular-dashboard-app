import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFormFooterComponent } from './button-form-footer.component';

describe('ButtonFormFooterComponent', () => {
  let component: ButtonFormFooterComponent;
  let fixture: ComponentFixture<ButtonFormFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFormFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFormFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
