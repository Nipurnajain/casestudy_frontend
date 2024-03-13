import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountComponent } from './add-discount.component';

describe('AddDiscountComponent', () => {
  let component: AddDiscountComponent;
  let fixture: ComponentFixture<AddDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDiscountComponent]
    });
    fixture = TestBed.createComponent(AddDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
