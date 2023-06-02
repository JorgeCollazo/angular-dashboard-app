import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaListComponent } from './compania-list.component';

describe('CompaniaListComponent', () => {
  let component: CompaniaListComponent;
  let fixture: ComponentFixture<CompaniaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
