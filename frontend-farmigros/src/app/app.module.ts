import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {GridComponent} from './components/grid/grid.component';
import {GridItemComponent} from './components/grid-item/grid-item.component';
import {SlideInventoryComponent} from "./components/slide-inventory/slide-inventory.component";
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent, GridComponent, GridItemComponent, SlideInventoryComponent],
  entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [
    GridComponent, GridItemComponent
  ]
})
export class AppModule {}
