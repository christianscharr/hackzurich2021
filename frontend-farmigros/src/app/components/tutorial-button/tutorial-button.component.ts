import {Component} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {TutorialComponent} from "../tutorial/tutorial.component";

@Component({
  selector: 'app-tutorial-button',
  templateUrl: './tutorial-button.component.html',
  styleUrls: ['./tutorial-button.component.scss'],
})
export class TutorialButtonComponent {
  constructor(private popoverController: PopoverController) { }

  async showPopover() {
    const popover =  await this.popoverController.create({
      component: TutorialComponent,
      translucent: true,
      cssClass: 'tutorial-popover'
    });
    await popover.present();
  }

  openTutorial() {
    this.showPopover();
  }
}
