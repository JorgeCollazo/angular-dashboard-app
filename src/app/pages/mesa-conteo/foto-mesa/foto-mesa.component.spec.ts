import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoMesaComponent } from './foto-mesa.component';

describe('FotoMesaComponent', () => {
  let component: FotoMesaComponent;
  let fixture: ComponentFixture<FotoMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
