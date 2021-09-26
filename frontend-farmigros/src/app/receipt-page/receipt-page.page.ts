import {Component, Inject, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {ProductDto} from './dto/product-dto';
import {ReceiptResponse} from './dto/receipt-response';
import {ObjectType} from './dto/objecttype';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.page.html',
  styleUrls: ['./receipt-page.page.scss'],
})
export class ReceiptPagePage {
  receiptContents: ProductDto[] = null;
  isProcessing = false;
  loadingElement: HTMLIonLoadingElement;
  boxOpened = new Array<number>();
  objectType = ObjectType;

  constructor(@Inject(HttpClient) private httpClient: HttpClient,
              @Inject(Router) private router: Router,
              @Inject(LoadingController) public loadingController: LoadingController) {
  }

  async navigateBack(): Promise<void> {
    await this.router.navigateByUrl('home');
  }

  async presentProcessing(): Promise<void> {
    this.isProcessing = true;
    this.loadingElement = await this.loadingController.create({
      cssClass: 'receipt-processing',
      message: 'Processing...',
      backdropDismiss: false,
      keyboardClose: true,
      showBackdrop: true
    });

    await this.loadingElement.present();
  }

  async takePicture() {
    await this.presentProcessing();
    let cameraPhoto: Photo;

    try {
      cameraPhoto = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        correctOrientation: true,
        saveToGallery: false,
        source: CameraSource.Camera,
      });
    } catch (err) {

    }

    if (!cameraPhoto) {
      this.isProcessing = false;
      await this.loadingElement.dismiss();
      await this.router.navigateByUrl('');
      return;
    }

    const formData = new FormData();
    const photoData = await fetch(cameraPhoto.dataUrl);
    const photoBlob = await photoData.blob();
    formData.append('file', photoBlob);

    try {
      const response = await fetch(`${environment.backendUrl}upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error(response);
        this.isProcessing = false;
        await this.loadingElement.dismiss();
        await this.router.navigateByUrl('');
        return;
      }

      this.isProcessing = false;
      await this.loadingElement.dismiss();
      const receiptResponse: ReceiptResponse = await response.json();
      this.receiptContents = receiptResponse.products;
    } catch (err) {
      console.error(err);
      this.isProcessing = false;
      await this.loadingElement.dismiss();
      await this.router.navigateByUrl('');
    }
  };

  openBox(idx: number): void {
    this.boxOpened.push(idx);
  }
}
