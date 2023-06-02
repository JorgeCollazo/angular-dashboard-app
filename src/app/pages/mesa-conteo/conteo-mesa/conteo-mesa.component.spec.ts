import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoMesaComponent } from './conteo-mesa.component';

describe('ConteoMesaComponent', () => {
  let component: ConteoMesaComponent;
  let fixture: ComponentFixture<ConteoMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteoMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
