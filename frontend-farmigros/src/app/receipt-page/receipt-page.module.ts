import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReceiptPagePageRoutingModule } from './receipt-page-routing.module';
import { ReceiptPagePage } from './receipt-page.page';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptPagePageRoutingModule,
    HttpClientModule
  ],
  declarations: [ReceiptPagePage]
})
export class ReceiptPagePageModule {}
