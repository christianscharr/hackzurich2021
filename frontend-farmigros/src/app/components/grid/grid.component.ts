import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Gesture, GestureController, IonContent} from '@ionic/angular';
import {getItemSizeByZoomLevel} from '../../helpers/helpers';
import {ItemStash} from '../item/ItemStash';
import {ItemService} from "../../services/item.service";
import {ObjectType} from "../../models/ObjectType";

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
    private ngChange: ChangeDetectorRef,
    private itemService: ItemService) {

    this.itemService.getGridItems().subscribe(remoteGridItems => {
      for (let x = 0; x < this.maxX; x++) {
        for (let y = 0; y < this.maxY; y++) {
          this.gridItems.push(remoteGridItems.find(item => item.x === x && item.y === y) || {x, y});
        }
      }
    })


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

      this.itemService.sow(x, y,  ObjectType[this.selectedItem.item.type.toUpperCase()])

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
          console.log('move')
        }
        if (gridItem.x === this.movingItem.x && gridItem.y === this.movingItem.y) {
          delete gridItem.plant;
          delete gridItem.level;
        }
        return gridItem;

      }) as [];

      this.movingItem = null;

      this.ngChange.detectChanges();
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
