import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from '../item/Item';
import {ItemStash} from "../item/ItemStash";

@Component({
  selector: 'app-slide-inventory',
  templateUrl: './slide-inventory.component.html',
  styleUrls: ['./slide-inventory.component.scss'],
})
export class SlideInventoryComponent{
  @Input() selectedItem;
  @Output() select = new EventEmitter<ItemStash | null>();

  isOpen = false;
  itemsAvailable: ItemStash[] = [
    {item: {id: 1, type: 'tree', level: 1}, amount: 4},
  ];

  setSelectedItem(id: number): void {
    for (let itemStash of this.itemsAvailable) {
      if (itemStash.item.id === id) {
        this.select.emit(itemStash);
      }
    }
    this.toggleOpen();
  }

  deleteSelectedItem() {
    this.select.emit(null);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;

  }
}
