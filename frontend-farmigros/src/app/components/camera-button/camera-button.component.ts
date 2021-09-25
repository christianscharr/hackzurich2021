import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-camera-button',
  templateUrl: './camera-button.component.html',
  styleUrls: ['./camera-button.component.scss'],
})
export class CameraButtonComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public async onCameraClick() {
    await this.router.navigateByUrl('camera');
  }

}
