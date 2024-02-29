import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountByManagerComponent } from './add-discount-by-manager.component';

describe('AddDiscountByManagerComponent', () => {
  let component: AddDiscountByManagerComponent;
  let fixture: ComponentFixture<AddDiscountByManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDiscountByManagerComponent]
    });
    fixture = TestBed.createComponent(AddDiscountByManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
