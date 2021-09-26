import {Component, Inject, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {TutorialComponent} from '../tutorial/tutorial.component';
import {TutorialService} from '../../tutorial.service';

@Component({
  selector: 'app-tutorial-button',
  templateUrl: './tutorial-button.component.html',
  styleUrls: ['./tutorial-button.component.scss'],
})
export class TutorialButtonComponent implements OnInit {
  private showTutorialBubble: boolean;

  constructor(@Inject(PopoverController) private popoverController: PopoverController,
              @Inject(TutorialService) private tutorial: TutorialService) {
    this.showTutorialBubble = this.tutorial.isTutorialActive();
  }

  ngOnInit() {
    this.showTutorialBubble = this.tutorial.isTutorialActive();
  }

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

  closeBubble(): void {
    this.showTutorialBubble = false;
    this.tutorial.deactivateTutorial();
  }
}
