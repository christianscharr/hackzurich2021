import { Component } from '@angular/core';
import {Item} from "../items/Item";
import {Category} from "../items/Category";

@Component({
  selector: 'app-slide-inventory',
  templateUrl: './slide-inventory.component.html',
  styleUrls: ['./slide-inventory.component.scss'],
})
export class SlideInventoryComponent {
  isOpen: boolean = false;
  selectedItem: Item = null;
  itemsAvailable: Category[] = [
    {label: 'Plants', items: [{id: 1, type: 'tree', level: 1}]}
  ];

  setSelectedItem(id: number): void {
    for (let category of this.itemsAvailable) {
      let itemTemp = category.items.find((item) => item.id === id);
      if (itemTemp !== undefined) {
        this.selectedItem = itemTemp;
        break;
      }
    }
    console.log(this.selectedItem)
    this.toggleOpen()
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
