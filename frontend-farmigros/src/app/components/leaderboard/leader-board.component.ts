import {Component, OnInit} from '@angular/core';
import {LeaderService} from '../../services/leader.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss'],
})
export class LeaderBoardComponent implements OnInit {

  constructor(private leaderService: LeaderService) {
    leaderService.leaderBoard().subscribe(leaders => {
      console.log(leaders);
      }
    )
  }

  ngOnInit() {

  }

}
