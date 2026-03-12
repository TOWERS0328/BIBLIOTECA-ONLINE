import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUsuario } from './layout-usuario';

describe('LayoutUsuario', () => {
  let component: LayoutUsuario;
  let fixture: ComponentFixture<LayoutUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
