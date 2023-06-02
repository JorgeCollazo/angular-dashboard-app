import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptPremioinstComponent } from './rpt-premioinst.component';

describe('RptPremioinstComponent', () => {
  let component: RptPremioinstComponent;
  let fixture: ComponentFixture<RptPremioinstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RptPremioinstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RptPremioinstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
