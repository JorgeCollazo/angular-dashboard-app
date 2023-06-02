import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlMessageActionComponent } from './mdl-message-action.component';

describe('MdlMessageActionComponent', () => {
  let component: MdlMessageActionComponent;
  let fixture: ComponentFixture<MdlMessageActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlMessageActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlMessageActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
