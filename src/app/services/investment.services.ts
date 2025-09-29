import { Injectable } from '@angular/core';
import { Investment } from '../models/investment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private investments: Investment[] = [
    {
      id: 1,
      cryptoId: 'bitcoin',
      cryptoSymbol: 'BTC',
      cryptoName: 'Bitcoin',
      quantity: 0.01,
      purchasePrice: 350000,
      purchaseDate: new Date('2025-08-10')
    },
    {
      id: 2,
      cryptoId: 'ethereum',
      cryptoSymbol: 'ETH',
      cryptoName: 'Ethereum',
      quantity: 0.2,
      purchasePrice: 18000,
      purchaseDate: new Date('2025-09-01')
    },
    {
      id: 3,
      cryptoId: 'solana',
      cryptoSymbol: 'SOL',
      cryptoName: 'Solana',
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