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

  ngOnInit() {
    this.takePicture()
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var dataUrl = image.dataUrl;
    console.log(dataUrl)
    this.httpClient.post('localhost:3000/upload', dataUrl)

    // Can be set to the src of an image now
    //imageElement.src = dataUrl;
  };
}
