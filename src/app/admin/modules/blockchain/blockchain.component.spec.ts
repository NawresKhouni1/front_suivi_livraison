import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlckchainComponent } from './blockchain.component';

describe('BlckchainComponent', () => {
  let component: BlckchainComponent;
  let fixture: ComponentFixture<BlckchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlckchainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlckchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
