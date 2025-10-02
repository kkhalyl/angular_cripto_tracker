import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

  constructor(private http: HttpClient) { }

  getPrices(crtptoIds: string[]): Observable<any> {
    const ids = crtptoIds.join(',');
    const vs_currencies = 'brl';
    return this.http.get(`${this.apiUrl}?ids=${ids}&vs_currencies=${vs_currencies}&include_24hr_change=true`);
  }
  
}
