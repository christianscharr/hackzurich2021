import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-leader-board-button',
  templateUrl: './leader-board-button.component.html',
  styleUrls: ['./leader-board-button.component.scss'],
})
export class LeaderBoardButtonComponent {
  constructor(private router: Router) { }

  async openLeaderBoard() {
    await this.router.navigateByUrl('leaderboard');
  }
}
