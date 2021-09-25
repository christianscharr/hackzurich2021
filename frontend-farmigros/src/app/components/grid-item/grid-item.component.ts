import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {getItemSizeByZoomLevel} from '../../helpers/helpers';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent implements OnInit {
  @Input() positionX: number;
  @Input() positionY: number;
  @Input() plant: string;
  @Input() level: number | string;
  @Input() zoomLevel: number | string;

  get size() {
    return getItemSizeByZoomLevel(this.zoomLevel);
  }

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



  constructor() { }

  ngOnInit() {
  }

  ngOnChange(change) {
    console.log(change);
  }

  onClick(event) {
    console.log('test', event);
  }

}
