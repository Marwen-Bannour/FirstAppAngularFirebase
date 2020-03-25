import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/class/contact';
import {MatTableDataSource} from '@angular/material/table';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ContactsService } from 'src/app/services/contacts.service';


@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
  animations:[
    trigger('searchEnterLeave', [
      transition(':enter', [
        style({width: '0',opacity: 0}),
        animate('600ms', style({ width: '30%',opacity: 1})),
      ]),
      transition(':leave', [
        style({ width: '30%',opacity: 1 }),
        animate('400ms', style({ width: '0',opacity: 0 })),
      ]),
    ])
  ]
})
export class ListContactsComponent implements OnInit {
  displayedColumns =  ['photo', 'fullName','mail','phone', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  search = false;
   
  constructor(private contactServ: ContactsService) { }

  ngOnInit() {
   
  }
  searchOpen(){
    this.search = true;
  }
  searchClose(){
    this.search = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


const ELEMENT_DATA: Contact[] = [
  { photo:'' ,fullName: 'Marwen Bannour', mail: 'marwnbnnr@gmail.com', phone: "+21623366692"},
  { photo:'' ,fullName: 'fawzi Bannour', mail: 'fawzibnnr@gmail.com', phone: "+21623999854"}
  
];
