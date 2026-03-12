import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosAdmin } from './prestamos-admin';

describe('PrestamosAdmin', () => {
  let component: PrestamosAdmin;
  let fixture: ComponentFixture<PrestamosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamosAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
