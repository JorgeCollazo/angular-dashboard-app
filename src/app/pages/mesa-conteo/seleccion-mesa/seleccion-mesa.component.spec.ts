import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionMesaComponent } from './seleccion-mesa.component';

describe('SeleccionMesaComponent', () => {
  let component: SeleccionMesaComponent;
  let fixture: ComponentFixture<SeleccionMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
