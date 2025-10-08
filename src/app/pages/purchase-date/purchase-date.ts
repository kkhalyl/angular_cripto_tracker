import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-purchase-date',
  imports: [CommonModule, MatCardModule, MatDividerModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatListModule, RouterModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './purchase-date.html',
  styleUrl: './purchase-date.scss'
})
export class PurchaseDate implements OnInit {
  selectedCryptoId: string | null = null;
  selectedCryptoValue: number | null = null;
  selectedPurchaseDate: Date | null = null;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.selectedCryptoId = this.route.snapshot.queryParamMap.get('coin');
    const valueString = this.route.snapshot.queryParamMap.get('value');
    if (valueString) {
      this.selectedCryptoValue = parseFloat(valueString);
    }
    console.log('Selected Crypto:', this.selectedCryptoId);
    console.log('Selected Value:', this.selectedCryptoValue);
  }

  setDateBack(unit: 'month' | 'year' | 'fiveYears' | 'tenYears'): void {
    const today = new Date();
    if (unit === 'month') {
      today.setMonth(today.getMonth() - 1);
    } else if (unit === 'year') {
      today.setFullYear(today.getFullYear() - 1);
    } else if (unit === 'fiveYears') {
      today.setFullYear(today.getFullYear() - 5);
    } else if (unit === 'tenYears') {
      today.setFullYear(today.getFullYear() - 10);
    }
    this.selectedPurchaseDate = today;
  }

}



