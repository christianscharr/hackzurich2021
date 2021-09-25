import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderBoardPage } from './leader-board-page.page';

const routes: Routes = [
  {
    path: '',
    component: LeaderBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderBoardPageRoutingModule {}
