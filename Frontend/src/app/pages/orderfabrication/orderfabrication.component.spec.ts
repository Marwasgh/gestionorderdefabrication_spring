import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderfabricationComponent } from './orderfabrication.component';

describe('OrderfabricationComponent', () => {
  let component: OrderfabricationComponent;
  let fixture: ComponentFixture<OrderfabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderfabricationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderfabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
