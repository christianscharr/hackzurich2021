import {Component, OnInit} from '@angular/core';
import {Camera, CameraResultType} from '@capacitor/camera';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.page.html',
  styleUrls: ['./camera-page.page.scss'],
})
export class CameraPagePage implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit() {
    await this.takePicture()
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    await this.httpClient.post('http://localhost:3000/receipts/upload', image.dataUrl).toPromise()
  };


}
