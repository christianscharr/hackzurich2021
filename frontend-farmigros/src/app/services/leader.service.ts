import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {RecievedItem} from "../components/item/RecievedItem";
import {ObjectType} from "../models/ObjectType";

@Injectable({
  providedIn: 'root',
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  competitors = [
    {name: 'Marie Curie', points: 100},
    {name: 'Leonhard Euler', points: 600},
    {name: 'Isac Netwon', points: 320},
    {name: 'Albert Hofmann', points: 428},
  ]

  leaderBoard() {
    return this.http.get('http://localhost:3000/leaderboard').pipe(
      map(points => ({name: 'Albert Einstein', points: points || 0})),
      map(me => [me, ...this.competitors].sort((a: {name: string, points: number}, b:{name: string, points: number}) =>  b.points - a.points)),
    );
  }

}
