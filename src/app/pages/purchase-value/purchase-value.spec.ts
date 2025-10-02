import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseValue } from './purchase-value';

describe('PurchaseValue', () => {
  let component: PurchaseValue;
  let fixture: ComponentFixture<PurchaseValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseValue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseValue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
