import {Component, Inject, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.page.html',
  styleUrls: ['./camera-page.page.scss'],
})
export class CameraPagePage implements OnInit {

  constructor(@Inject(HttpClient) private httpClient: HttpClient,
              @Inject(Router) private router: Router) {
  }

  async ngOnInit() {
    try {
      await this.takePicture();
    } finally {
      await this.router.navigateByUrl('');
    }
  }

  async takePicture() {
    const cameraPhoto: Photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      correctOrientation: true,
      saveToGallery: false,
      source: CameraSource.Camera,
    });
    if (!cameraPhoto) {
      return;
    }

    const formData = new FormData();
    const photoData = await fetch(cameraPhoto.dataUrl);
    const photoBlob = await photoData.blob();
    formData.append('file', photoBlob);

    try {
      const response = await fetch('http://127.0.0.1:3000/receipts/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
}
