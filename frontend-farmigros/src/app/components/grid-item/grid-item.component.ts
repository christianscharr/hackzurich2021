import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getItemSizeByZoomLevel} from '../../helpers/helpers';
import {GestureController} from '@ionic/angular';
import {Vibration} from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent implements OnInit {
  @Input() positionX: number;
  @Input() positionY: number;
  @Input() moveOperationOngoing: boolean;
  @Input() seadOperationOngoing: boolean;
  @Input() sellOperationOngoing: boolean;
  @Input() plant: string;
  @Input() level: number | string;
  @Input() zoomLevel: number | string;
  @Input() isMoving: boolean;
  @Output() clicked = new EventEmitter<any>();
  @Output() startMoving = new EventEmitter<any>();

  editCallback = null;
  sizes = {
    1: 64,
    2: 72,
    3: 80,
    4: 88,
    5: 96,
    6: 104,
    7: 112,
    8: 120,
    9: 128,
    10: 136,
  };

  constructor(
    private el: ElementRef,
    private gestureCtrl: GestureController,
    private vibration: Vibration
  ) {
  }

  get size() {
    return getItemSizeByZoomLevel(this.zoomLevel);
  }

  ngOnInit() {
    const gesture = this.gestureCtrl.create({
      el: this.el.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onMove: ev => {
        this.onMove(ev);
      },
      onStart: ev => {
        this.onPress();
      },
      onEnd: ev => {
        this.longPressActionEnd(ev);
      }
    });
    gesture.enable(true);
  }

  onPress() {
    if (this.plant) {
      this.editCallback = setTimeout(() => {
        this.vibration.vibrate(200);
        this.startMoving.emit({x: this.positionX, y: this.positionY, plant: this.plant, level: this.level})
      }, 1000);
    }
  }

  onMove(move) {
    if (move.deltaX > 10 || move.deltaY > 10) {
      clearInterval(this.editCallback);
    }
  }

  onClick(event) {
    if (this.plant) {
      if(this.sellOperationOngoing && this.level >=5){
        this.clicked.emit({x: this.positionX, y: this.positionY, event: 'sell'});
      }
      return;
    }

    this.clicked.emit({x: this.positionX, y: this.positionY, event: this.moveOperationOngoing ? 'move' : 'sow'});

  }


  private longPressActionEnd(event) {
    if ((event.currentTime - event.startTime) < 200) {
      clearInterval(this.editCallback);
    }
  }
}
