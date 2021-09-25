import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemStash} from "../item/ItemStash";
import {HttpClient} from "@angular/common/http";
import {ObjectType} from "../../models/ObjectType";
import {Item} from "../item/Item";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-slide-inventory',
  templateUrl: './slide-inventory.component.html',
  styleUrls: ['./slide-inventory.component.scss'],
})
export class SlideInventoryComponent implements OnInit {
  @Input() selectedItem;
  @Output() select = new EventEmitter<ItemStash | null>();

  isOpen = false;
  itemsAvailable: ItemStash[] = [];

  constructor(private itemService: ItemService, ) {
  }

  ngOnInit() {
    this.parseInventoryData()
  }

  parseInventoryData() {
    this.itemService.getInventoryItems().subscribe((data) => {
      let itemArr: Item[] = [];
      let dataArr = data as number[];
      let id = 1;
      dataArr.forEach((nr) => {
        itemArr.push({id: id, type: (ObjectType[nr]).toString().toLowerCase(), level: 1});
        id++;
      })
      itemArr.forEach((item) => {
        let stash = this.itemsAvailable.find((itemStash) => itemStash.item.type === item.type);
        if (stash) {
          stash.amount++;
        } else {
          this.itemsAvailable.push({item: item, amount: 1});
        }
      })
      console.log(this.itemsAvailable);
    });
  }

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
    for (let itemStash of this.itemsAvailable) {
      if (itemStash.amount <= 0) {
        this.itemsAvailable = this.itemsAvailable.filter((i) => i != itemStash);
      }
    }
  }
}
