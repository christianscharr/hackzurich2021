import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {GridComponent} from './components/grid/grid.component';
import {GridItemComponent} from './components/grid-item/grid-item.component';
import {SlideInventoryComponent} from './components/slide-inventory/slide-inventory.component';
import {FormsModule} from '@angular/forms';
import {ReceiptButtonComponent} from './components/receipt-button/receipt-button.component';
import {TutorialButtonComponent} from './components/tutorial-button/tutorial-button.component';
import {TutorialComponent} from './components/tutorial/tutorial.component';
import {HttpClientModule} from '@angular/common/http';
import {Vibration} from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [AppComponent, GridComponent, GridItemComponent,
    SlideInventoryComponent, ReceiptButtonComponent, TutorialButtonComponent, TutorialComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, Vibration],
  bootstrap: [AppComponent],
  exports: [
    GridComponent, GridItemComponent
  ]
})
export class AppModule {
}
