import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDiscountManagerComponent } from './display-discount-manager.component';

describe('DisplayDiscountManagerComponent', () => {
  let component: DisplayDiscountManagerComponent;
  let fixture: ComponentFixture<DisplayDiscountManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayDiscountManagerComponent]
    });
    fixture = TestBed.createComponent(DisplayDiscountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
