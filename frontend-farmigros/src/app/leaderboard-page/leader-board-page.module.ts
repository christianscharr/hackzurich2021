import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {LeaderBoardPage} from './leader-board-page.page';
import {HttpClientModule} from '@angular/common/http';
import {LeaderBoardPageRoutingModule} from './leader-board-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderBoardPageRoutingModule,
    HttpClientModule
  ],
  declarations: [LeaderBoardPage]
})
export class LeaderBoardPageModule {}
