import { Component, OnInit } from '@angular/core';
import{trigger, transition, animate, style, state} from '@angular/animations';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations:[
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(+100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ContactsComponent implements OnInit {
  cols = 2 ;
  constructor() { }

  ngOnInit() {
  }
  openAdd(){
    this.cols = 3 ;
  }
  closeAdd(){
    this.cols = 2 ;
  }
}
