import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Investment } from '/workspaces/angular_cripto_tracker/src/app/models/investment';
import { InvestmentService } from '/workspaces/angular_cripto_tracker/src/app/services/investment.services';
import { CryptoService } from '/workspaces/angular_cripto_tracker/src/app/services/crypto';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


@Component({
  selector: 'app-investment-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule, MatListModule, MatDividerModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './investment-list.html',
  styleUrl: './investment-list.scss'
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
        catchError(error => {
          console.error('API Error:', error);
          this.errorMessage = 'Could not load live price data. Please try again later.';
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(priceData => {
        this.investments.forEach(inv => {
          const priceInfo = priceData[inv.cryptoId];
          if (priceInfo) {
            inv.currentPrice = priceInfo.brl;
            inv.priceChangePercentage24h = priceInfo.brl_24h_change;
            if (inv.currentPrice !== undefined) {
              const totalPurchaseCost = inv.quantity * inv.purchasePrice;
              const currentTotalValue = inv.quantity * inv.currentPrice;
              inv.profitOrLoss = ((currentTotalValue - totalPurchaseCost) / totalPurchaseCost) * 100;
            }
          }
        });
      });
    } else {
      this.isLoading = false;
    }
  }
}
