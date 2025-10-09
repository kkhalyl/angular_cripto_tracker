import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

  private prices$: Observable<any> | undefined;
  private historicalPrices$: Map<string, Observable<any>> = new Map();
  private marketChartCache$: Map<string, Observable<any>> = new Map();

  constructor(private http: HttpClient) { }

  getPrices(cryptoId: string[]): Observable<any> {
    if (!this.prices$) {
      const ids = cryptoId.join(',');
      const vs_currencies = 'brl';
      const url = `${this.apiUrl}?ids=${ids}&vs_currencies=${vs_currencies}&include_24hr_change=true`;
      
      this.prices$ = this.http.get(url).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.prices$;
  }

  getHistoricalPrice(cryptoId: string, date: Date): Observable<any> {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dateString = `${year}-${month}-${day}`;
    const cacheKey = `${cryptoId}-${dateString}`;

    
    if (!this.historicalPrices$.has(cacheKey)) {
      const url = `https://api.coingecko.com/api/v3/coins/${cryptoId}/history?date=${dateString}`;
      const historicalPriceObservable = this.http.get(url).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.historicalPrices$.set(cacheKey, historicalPriceObservable);
    }

    
    return this.historicalPrices$.get(cacheKey)!;
  }

  getMarketChartDataRange(cryptoId: string, fromDate: Date, toDate: Date): Observable<any> {
    const fromTimestamp = Math.floor(fromDate.getTime() / 1000);
    const toTimestamp = Math.floor(toDate.getTime() / 1000);
    const cacheKey = `${cryptoId}-${fromTimestamp}-${toTimestamp}`;

    if (!this.marketChartCache$.has(cacheKey)) {
      const url = `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart/range?vs_currency=brl&from=${fromTimestamp}&to=${toTimestamp}`;
      const marketChartObservable = this.http.get(url).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.marketChartCache$.set(cacheKey, marketChartObservable);
    }
    return this.marketChartCache$.get(cacheKey)!;
  }
  
}
