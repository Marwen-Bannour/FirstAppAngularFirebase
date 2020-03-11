import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
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
