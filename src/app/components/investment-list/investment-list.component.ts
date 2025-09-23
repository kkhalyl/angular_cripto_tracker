import { Component, OnInit } from '@angular/core';
import { Investment } from '/workspaces/angular_cripto_tracker/src/app/models/investment';
import { InvestmentService } from '/workspaces/angular_cripto_tracker/src/app/services/investment.services';
import { CommonModule } from '@angular/common';
import { CryptoService } from '/workspaces/angular_cripto_tracker/src/app/services/crypto';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/list';

@Component({
  selector: 'app-investment-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatDivider],
  templateUrl: './investment-list.html',
  styleUrl: './investment-list.css'
})
export class InvestmentListComponent implements OnInit {

  investments: Investment[] = [];

  constructor(private investmentService: InvestmentService,
              private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
    this.investments = this.investmentService.getInvestments();
    const cryptoIds = this.investments.map(inv => inv.cryptoId);

    if (cryptoIds.length > 0) {
      this.cryptoService.getPrices(cryptoIds).subscribe(prices => {
        this.investments.forEach(inv => {
          const priceInfo = prices[inv.cryptoId];
          if (priceInfo) {
            inv.currentPrice = priceInfo['brl'];
            if (inv.currentPrice !== undefined) {
              const totalPurchaseCost = inv.quantity * inv.purchasePrice;
              const currentTotalValue = inv.quantity * inv.currentPrice;
              inv.profitOrLoss = (currentTotalValue - totalPurchaseCost) / totalPurchaseCost * 100;
            }
          }
        });
      });
    }
  }
}
