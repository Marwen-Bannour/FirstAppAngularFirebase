import { Component, OnInit } from '@angular/core';
import{trigger, transition, animate, style} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('anmt',[
        transition('void => *',[
          style({ opacity:0}),
          animate(1100)])
    ])
  ]
})
export class HomeComponent implements OnInit {
  start = false;
  n= 50 ;
  constructor() { }

  ngOnInit() {
  }
 getStarted(){
   this.start = true;
 }
}
