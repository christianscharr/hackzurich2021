import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private tutorialActive = true;

  constructor() { }

  deactivateTutorial(): void {
    this.tutorialActive = false;
  }

  isTutorialActive(): boolean {
    return this.tutorialActive;
  }
}
