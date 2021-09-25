import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptPagePage } from './receipt-page.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptPagePageRoutingModule {}
