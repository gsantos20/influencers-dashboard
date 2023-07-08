import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Card } from '../../models/cards';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {}
  /** Based on the screen size, switch from standard to one column per row */
    cards: Card[] =  [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];


  ngOnInit(){

  }
}
