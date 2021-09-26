import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  sellMode = false;

  constructor(private httpClient: HttpClient) {
  }

  sell(x: number, y: number, value: number) {
    this.httpClient.put(environment.backendUrl + 'sell', {
      positionX: x,
      positionY: y,
      value: value
    }).subscribe()
  }

  toggleSellMode() {
    this.sellMode = !this.sellMode;
  }
}
