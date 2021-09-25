import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-receipt-button',
  templateUrl: './receipt-button.component.html',
  styleUrls: ['./receipt-button.component.scss'],
})
export class ReceiptButtonComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public async onReceiptClick() {
    await this.router.navigateByUrl('receipt');
  }
}
