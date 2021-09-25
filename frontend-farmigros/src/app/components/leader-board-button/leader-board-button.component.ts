import {Component} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {TutorialComponent} from "../tutorial/tutorial.component";
import {LeaderBoardComponent} from '../leaderboard/leader-board.component';

@Component({
  selector: 'app-leader-board-button',
  templateUrl: './leader-board-button.component.html',
  styleUrls: ['./leader-board-button.component.scss'],
})
export class LeaderBoardButtonComponent {
  constructor(private popoverController: PopoverController) { }

  async showPopover() {
    const popover =  await this.popoverController.create({
      component: LeaderBoardComponent,
      translucent: true,
      cssClass: 'tutorial-popover'
    });
    await popover.present();
  }

  openLeaderBoard() {
    this.showPopover();
  }
}
