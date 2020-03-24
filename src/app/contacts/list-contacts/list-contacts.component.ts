import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/class/contact';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {
  displayedColumns =  ['photo', 'fullName','mail','phone', 'action'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
    
  }

}


const ELEMENT_DATA: Contact[] = [
  { photo:'' ,fullName: 'Marwen Bannour', mail: 'marwnbnnr@gmail.com', phone: "+21623366692"},
  { photo:'' ,fullName: 'fawzi Bannour', mail: 'fawzibnnr@gmail.com', phone: "+21623999854"}
  
];
