import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  sellMode = false;

  constructor(private httpClient: HttpClient) {
  }

  sell(x: number, y: number, value: number) {
    this.httpClient.put('http://localhost:3000/sell', {
      positionX: x,
      positionY: y,
      value: value
    }).subscribe()
  }

  toggleSellMode() {
    this.sellMode = !this.sellMode;
  }
}
