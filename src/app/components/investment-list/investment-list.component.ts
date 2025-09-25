import { Component, OnInit } from '@angular/core';
import { Investment } from '/workspaces/angular_cripto_tracker/src/app/models/investment';
import { InvestmentService } from '/workspaces/angular_cripto_tracker/src/app/services/investment.services';
import { CryptoService } from '/workspaces/angular_cripto_tracker/src/app/services/crypto';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import spinner module
import { catchError, finalize } from 'rxjs/operators'; // Import RxJS operators
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-investment-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule, MatProgressSpinnerModule, MatToolbar],
  templateUrl: './investment-list.html',
  styleUrl: './investment-list.css'
})
export class InvestmentListComponent implements OnInit {

  investments: Investment[] = [];
  isLoading = true; // Flag to track loading state
  errorMessage: string | null = null; // Property to hold error messages

  constructor(
    private investmentService: InvestmentService,
    private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
    this.investments = this.investmentService.getInvestments();
    const cryptoIds = this.investments.map(inv => inv.cryptoId);

    if (cryptoIds.length > 0) {
      this.cryptoService.getPrices(cryptoIds).pipe(
        // This block runs ONLY if the API call fails
        catchError(error => {
          console.error('API Error:', error);
          this.errorMessage = 'Could not load live price data. Please try again later.';
          return EMPTY; // Stops the observable stream gracefully
        }),
        // This block runs when the call is complete (on success OR error)
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(priceData => {
        // This block runs ONLY on success
        this.investments.forEach(inv => {
          const priceInfo = priceData[inv.cryptoId];
          if (priceInfo) {
            inv.currentPrice = priceInfo.brl;
            if (inv.currentPrice !== undefined) {
              const totalPurchaseCost = inv.quantity * inv.purchasePrice;
              const currentTotalValue = inv.quantity * inv.currentPrice;
              inv.profitOrLoss = ((currentTotalValue - totalPurchaseCost) / totalPurchaseCost) * 100;
            }
          }
        });
      });
    } else {
      this.isLoading = false; // No investments to load
    }
  }
}
