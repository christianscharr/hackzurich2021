import { Component } from '@angular/core';
import {Item} from "../item/Item";

@Component({
  selector: 'app-slide-inventory',
  templateUrl: './slide-inventory.component.html',
  styleUrls: ['./slide-inventory.component.scss'],
})
export class SlideInventoryComponent {
  isOpen: boolean = false;
  selectedItem: Item = null;
  itemsAvailable: Item[] = [
    {id: 1, type: 'tree', level: 1},
  ];

  setSelectedItem(id: number): void {
    this.selectedItem = this.itemsAvailable.find((item) => item.id === id);
    console.log(this.selectedItem)
    this.toggleOpen()
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
