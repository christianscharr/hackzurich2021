import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.page.html',
  styleUrls: ['./leader-board-page.page.scss'],
})
export class LeaderBoardPage {
  leaders = [];

  constructor(@Inject(LeaderService) private leaderService: LeaderService,
              @Inject(Router) private router: Router) {
    leaderService.leaderBoard().subscribe(leaders => {
        this.leaders = leaders;
      }
    );
  }

  async navigateBack(): Promise<void> {
    await this.router.navigateByUrl('home');
  }
}
