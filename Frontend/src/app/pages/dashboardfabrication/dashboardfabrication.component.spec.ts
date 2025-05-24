import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardfabricationComponent } from './dashboardfabrication.component';

describe('DashboardfabricationComponent', () => {
  let component: DashboardfabricationComponent;
  let fixture: ComponentFixture<DashboardfabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardfabricationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardfabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
