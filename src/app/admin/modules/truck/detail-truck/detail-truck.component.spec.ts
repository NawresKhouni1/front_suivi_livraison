import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTruckComponent } from './detail-truck.component';

describe('DetailTruckComponent', () => {
  let component: DetailTruckComponent;
  let fixture: ComponentFixture<DetailTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailTruckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
