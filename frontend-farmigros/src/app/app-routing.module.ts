import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {GridComponent} from './components/grid/grid.component';

const routes: Routes = [
  {
    path: 'home',
    component: GridComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt-page/receipt-page.module').then(m => m.ReceiptPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
