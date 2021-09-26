import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {RecievedItem} from "../components/item/RecievedItem";
import {ObjectType} from "../models/ObjectType";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  constructor(private http: HttpClient) { }

  sow(positionX, positionY, objectType) {
    this.http.put(environment.backendUrl + 'put', { positionX, positionY, objectType }).subscribe()
  }

  getGridItems() {
    return this.http.get(environment.backendUrl + 'grid-objects').pipe(
      map((dtos) => dtos as RecievedItem[]),
      map((dtos: RecievedItem[]) => dtos.map(dto => ({x: dto.positionX, y: dto.positionY, plant: ObjectType[dto.objectType].toString().toLowerCase(), level: dto.addedAt}))),
    );
  }

  getInventoryItems() {
    return this.http.get(environment.backendUrl + 'inventory');
  }

  move(oldX: number, oldY: number, newX: number, newY:number) {
    this.http.put(environment.backendUrl + 'move-grid-object', {oldX: oldX, oldY: oldY, newX: newX, newY: newY}).subscribe();

  }
}
