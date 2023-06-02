import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaInformacionComponent } from './mesa-informacion.component';

describe('MesaInformacionComponent', () => {
  let component: MesaInformacionComponent;
  let fixture: ComponentFixture<MesaInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesaInformacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
