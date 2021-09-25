import { Component, OnInit, Input, ViewChild } from '@angular/core';

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




  constructor() { }

  ngOnInit() {}

  onClick(event) {
    console.log('test', event);
  }

}
