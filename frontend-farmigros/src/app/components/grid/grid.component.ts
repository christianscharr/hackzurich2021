import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Gesture, GestureController, IonContent} from '@ionic/angular';
import {getItemSizeByZoomLevel} from '../../helpers/helpers';
import {Item} from '../item/Item';
import {ItemStash} from "../item/ItemStash";
import {ChangeDetection} from '@angular/cli/lib/config/workspace-schema';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements AfterViewInit, OnInit {

  zoomLevel = 5;
  selectedItem: ItemStash = null;
  movingItem: any = null;
  action: any; //not stacking actions



  gridItems = [
    {x: 0, y: 0, plant: 'tree', level: 1},
    {x: 0, y: 1, plant: 'tree', level: 2},
    {x: 0, y: 2, plant: 'tree', level: 3},
    {x: 0, y: 3, plant: 'tree', level: 4},
    {x: 0, y: 4, plant: 'tree', level: 'dead'},
    {x: 0, y: 5},
    {x: 0, y: 6},
    {x: 0, y: 7},
    {x: 0, y: 8},
    {x: 0, y: 9},
    {x: 0, y: 10},
    {x: 0, y: 11},
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 1, y: 3},
    {x: 1, y: 4},
    {x: 1, y: 5},
    {x: 1, y: 6},
    {x: 1, y: 7},
    {x: 1, y: 8},
    {x: 1, y: 9},
    {x: 1, y: 10},
    {x: 1, y: 11},
    {x: 2, y: 0},
    {x: 2, y: 1},
    {x: 2, y: 2},
    {x: 2, y: 3},
    {x: 2, y: 4},
    {x: 2, y: 5},
    {x: 2, y: 6},
    {x: 2, y: 7},
    {x: 2, y: 8},
    {x: 2, y: 9},
    {x: 2, y: 10},
    {x: 2, y: 11},
    {x: 3, y: 0},
    {x: 3, y: 1},
    {x: 3, y: 2},
    {x: 3, y: 3},
    {x: 3, y: 4},
    {x: 3, y: 5},
    {x: 3, y: 6},
    {x: 3, y: 7},
    {x: 3, y: 8},
    {x: 3, y: 9},
    {x: 3, y: 10},
    {x: 3, y: 11},
    {x: 4, y: 0},
    {x: 4, y: 1},
    {x: 4, y: 2},
    {x: 4, y: 3},
    {x: 4, y: 4},
    {x: 4, y: 5},
    {x: 4, y: 6},
    {x: 4, y: 7},
    {x: 4, y: 8},
    {x: 4, y: 9},
    {x: 4, y: 10},
    {x: 4, y: 11},
    {x: 5, y: 0},
    {x: 5, y: 1},
    {x: 5, y: 2},
    {x: 5, y: 3},
    {x: 5, y: 4},
    {x: 5, y: 5},
    {x: 5, y: 6},
    {x: 5, y: 7},
    {x: 5, y: 8},
    {x: 5, y: 9},
    {x: 5, y: 10},
    {x: 5, y: 11},
    {x: 6, y: 0},
    {x: 6, y: 1},
    {x: 6, y: 2},
    {x: 6, y: 3},
    {x: 6, y: 4},
    {x: 6, y: 5},
    {x: 6, y: 6},
    {x: 6, y: 7},
    {x: 6, y: 8},
    {x: 6, y: 9},
    {x: 6, y: 10},
    {x: 6, y: 11},
    {x: 7, y: 0},
    {x: 7, y: 1},
    {x: 7, y: 2},
    {x: 7, y: 3},
    {x: 7, y: 4},
    {x: 7, y: 5},
    {x: 7, y: 6},
    {x: 7, y: 7},
    {x: 7, y: 8},
    {x: 7, y: 9},
    {x: 7, y: 10},
    {x: 7, y: 11},
    {x: 8, y: 0},
    {x: 8, y: 1},
    {x: 8, y: 2},
    {x: 8, y: 3},
    {x: 8, y: 4},
    {x: 8, y: 5},
    {x: 8, y: 6},
    {x: 8, y: 7},
    {x: 8, y: 8},
    {x: 8, y: 9},
    {x: 8, y: 10},
    {x: 8, y: 11},
    {x: 9, y: 0},
    {x: 9, y: 1},
    {x: 9, y: 2},
    {x: 9, y: 3},
    {x: 9, y: 4},
    {x: 9, y: 5},
    {x: 9, y: 6},
    {x: 9, y: 7},
    {x: 9, y: 8},
    {x: 9, y: 9},
    {x: 9, y: 10},
    {x: 9, y: 11},
    {x: 10, y: 0},
    {x: 10, y: 1},
    {x: 10, y: 2},
    {x: 10, y: 3},
    {x: 10, y: 4},
    {x: 10, y: 5},
    {x: 10, y: 6},
    {x: 10, y: 7},
    {x: 10, y: 8},
    {x: 10, y: 9},
    {x: 10, y: 10},
    {x: 10, y: 11},
    {x: 11, y: 0},
    {x: 11, y: 1},
    {x: 11, y: 2},
    {x: 11, y: 3},
    {x: 11, y: 4},
    {x: 11, y: 5},
    {x: 11, y: 6},
    {x: 11, y: 7},
    {x: 11, y: 8},
    {x: 11, y: 9},
    {x: 11, y: 10},
    {x: 11, y: 11},
  ];

  private longPressActive = false;

  private gesture: Gesture;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    private el: ElementRef,
    private gestureCtrl: GestureController,
    private ngChange: ChangeDetectorRef,
) {}

  ngOnInit() {

  }



  async ngAfterViewInit() {
    const center = 6 * getItemSizeByZoomLevel(this.zoomLevel) * 0.5;
    requestAnimationFrame(async () =>   await this.content.scrollToPoint(center, center, 1000));
  }



  onTouchStart($event) {
    console.log($event);
  }

  onMove(detail): void {
    console.log('moved', detail);
  }

  onPinch(event) {
    console.log(event);
  }

  onClick(event) {
    console.log(event);
  }

  onGridClick({x, y, event}) {
    if(event === 'sow' && this.selectedItem) {

      this.gridItems = this.gridItems.map(gridItem => {
        if(gridItem.x === x && gridItem.y === y) {
          gridItem.plant =  this.selectedItem.item.type;
          gridItem.level = 1;
        }
        return gridItem;

      }) as [];
      this.selectedItem.amount--;
      if (this.selectedItem.amount <= 0) {
        this.selectedItem = null;
      }
    }

    if(event === 'move' && this.movingItem) {

      console.log('move', this.movingItem, x, y);

      this.gridItems = this.gridItems.map(gridItem => {
        if(gridItem.x === x && gridItem.y === y) {
          gridItem.plant = this.movingItem.plant;
          gridItem.level = this.movingItem.level;
        }
        if(gridItem.x === this.movingItem.x && gridItem.y === this.movingItem.y) {
          delete gridItem.plant;
          delete gridItem.level;
        }
        return gridItem;

      }) as [];

      this.movingItem = null;
    }
  }

  onSelectItem(item) {
    this.selectedItem = item;
  }

  onStartMoving(item) {
    this.movingItem = item;
    this.ngChange.detectChanges();
    console.log(this.movingItem);
  }
}
