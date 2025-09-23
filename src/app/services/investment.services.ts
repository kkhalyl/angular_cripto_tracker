import { Injectable } from '@angular/core';
import { Investment } from '../models/investment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService { // <--- Nome da classe corrigido!

  private investments: Investment[] = [
    {
      id: 1,
      cryptoId: 'bitcoin',
      cryptoSymbol: 'BTC',
      quantity: 0.01,
      purchasePrice: 350000,
      purchaseDate: new Date('2025-08-10')
    },
    {
      id: 2,
      cryptoId: 'ethereum',
      cryptoSymbol: 'ETH',
      quantity: 0.2,
      purchasePrice: 18000,
      purchaseDate: new Date('2025-09-01')
    }
  ];

  constructor() { }

  getInvestments(): Investment[] {
    return this.investments;
  }
}