import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Gesture, GestureController, IonContent} from '@ionic/angular';
import {getItemSizeByZoomLevel} from '../../helpers/helpers';
import {ItemStash} from '../item/ItemStash';

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
  maxX = 12;
  maxY = 12;
  gridItems = [];

  @ViewChild(IonContent, {static: false}) content: IonContent;
  private longPressActive = false;
  private gesture: Gesture;

  constructor(
    private el: ElementRef,
    private gestureCtrl: GestureController,
    private ngChange: ChangeDetectorRef) {
    for (let x = 0; x < this.maxX; x++) {
      for (let y = 0; y < this.maxY; y++) {
        this.gridItems.push({x, y});
      }
    }

    this.gridItems = this.patchGridItem(4, 5, {plant: 'tree', level: 1});
    this.gridItems = this.patchGridItem(5, 5, {plant: 'tree', level: 2});
    this.gridItems = this.patchGridItem(4, 6, {plant: 'tree', level: 3});
    this.gridItems = this.patchGridItem(5, 6, {plant: 'tree', level: 4});
    this.gridItems = this.patchGridItem(4, 7, {plant: 'tree', level: 'dead'});
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    const center = 6 * getItemSizeByZoomLevel(this.zoomLevel) * 0.5;
    requestAnimationFrame(async () => await this.content.scrollToPoint(center, center, 1000));
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
    if (event === 'sow' && this.selectedItem) {
      this.gridItems = this.patchGridItem(x, y, {
        plant: this.selectedItem.item.type,
        level: 1
      });
      this.selectedItem.amount--;
      if (this.selectedItem.amount <= 0) {
        this.selectedItem = null;
      }
    }

    if (event === 'move' && this.movingItem) {

      console.log('move', this.movingItem, x, y);

      this.gridItems = this.gridItems.map(gridItem => {
        if (gridItem.x === x && gridItem.y === y) {
          gridItem.plant = this.movingItem.plant;
          gridItem.level = this.movingItem.level;
        }
        if (gridItem.x === this.movingItem.x && gridItem.y === this.movingItem.y) {
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

  patchGridItem(x: number, y: number, newValues: any): any[] {
    return this.gridItems.map(item => (item.x === x && item.y === y)?{...item, ...newValues}:item);
  }
}
