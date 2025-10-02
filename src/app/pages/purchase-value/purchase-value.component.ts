import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-value',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatListModule, MatIconModule, MatInputModule, MatDividerModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './purchase-value.html',
  styleUrl: './purchase-value.scss'
})
export class PurchaseValue implements OnInit {
  selectedCryptoId: string | null = null;
  selectedCryptoValue: number | null = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedCryptoId = this.route.snapshot.paramMap.get('cryptoId');

    console.log('Selected Crypto:', this.selectedCryptoId);
  }

  addValue(amount: number): void {
    const currentValue = this.selectedCryptoValue || 0;
    this.selectedCryptoValue = currentValue + amount;
  }
}
