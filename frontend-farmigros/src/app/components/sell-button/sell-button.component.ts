import {Component, OnInit} from '@angular/core';
import {SellService} from '../../sell.service';

@Component({
  selector: 'app-sell-button',
  templateUrl: './sell-button.component.html',
  styleUrls: ['./sell-button.component.scss'],
})
export class SellButtonComponent{

  constructor(public sellService: SellService) {
  }
  public async onSellClick() {
    this.sellService.toggleSellMode();
  }
}
