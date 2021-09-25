import {Component, Inject, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.page.html',
  styleUrls: ['./leader-board-page.page.scss'],
})
export class LeaderBoardPage {
  leaders = [];

  constructor(private leaderService: LeaderService) {
    leaderService.leaderBoard().subscribe(leaders => {
        this.leaders = leaders;
      }
    )
  }




}
