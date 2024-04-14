import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosclientesComponent } from './pedidosclientes.component';

describe('PedidosclientesComponent', () => {
  let component: PedidosclientesComponent;
  let fixture: ComponentFixture<PedidosclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosclientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
