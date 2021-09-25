import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from '../item/Item';

@Component({
  selector: 'app-slide-inventory',
  templateUrl: './slide-inventory.component.html',
  styleUrls: ['./slide-inventory.component.scss'],
})
export class SlideInventoryComponent {
  @Input() selectedItem;
  @Output() select = new EventEmitter<Item | null>();


  isOpen = false;
  itemsAvailable: Item[] = [
    {id: 1, type: 'tree', level: 1},
  ];

  setSelectedItem(id: number): void {
    this.select.emit(this.itemsAvailable.find((item) => item.id === id));
    this.toggleOpen();
  }

  deleteSelectedItem() {
    this.select.emit(null);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if(!this.isOpen) {
      // this.select.emit(null);
    }
  }
}
