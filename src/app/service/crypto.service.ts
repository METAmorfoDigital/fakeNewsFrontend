import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap: number;
  
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,cardano,solana';

  constructor(private http: HttpClient) { }

  getCryptos(): Observable<Crypto[]> {
    return this.http.get<Crypto[]>(this.apiUrl);
  }
}
