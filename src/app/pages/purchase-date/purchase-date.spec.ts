import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDate } from './purchase-date';

describe('PurchaseDate', () => {
  let component: PurchaseDate;
  let fixture: ComponentFixture<PurchaseDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
