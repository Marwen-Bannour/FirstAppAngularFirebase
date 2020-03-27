import { Component, OnInit, ViewChild, Output , EventEmitter  } from '@angular/core';
import { Contact } from 'src/app/class/contact';
import {MatTableDataSource} from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContactsService } from 'src/app/services/contacts.service';
import {MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
  animations:[
    trigger('searchEnterLeave', [
      transition(':enter', [
        style({width: '0',opacity: 0}),
        animate('600ms', style({ width: '60%',opacity: 1})),
      ]),
      transition(':leave', [
        style({ width: '60%',opacity: 1 }),
        animate('400ms', style({ width: '0',opacity: 0 })),
      ]),
    ])
  ]
})
export class ListContactsComponent implements OnInit {
  list:Contact[];
  displayedColumns : string[]=  ['photo', 'fullName','mail','phone', 'action'];
  dataSource = new MatTableDataSource(this.list);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() outEvent = new EventEmitter<number>();
  
  search = false;
  
  
   
  constructor(private contactServ: ContactsService,
              private toastr:ToastrService) { }

  ngOnInit() {
    
    this.contactServ.getContacts().subscribe(data => { 
      this.list = data.map(item => {
      return {
        id: item.payload.doc.id,
        ... <any>item.payload.doc.data()
      } as Contact;
    })
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    })
    

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

  onEdit(cnt: Contact) {
    this.contactServ.formData = Object.assign({}, cnt);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.contactServ.deleteContact(id);
      this.toastr.warning('Deleted successfully','EMP. Register');
    }
  }

  edit(elm : Contact){
    this.outEvent.emit(3);
    console.log("edit function: "+ elm.id);
    this.contactServ.formData = Object.assign({}, elm);
    this.contactServ.contactform.controls['idFormControl'].setValue(elm.id) ;
    this.contactServ.contactform.controls['fullNameFormControl'].setValue(elm.fullName) ;
    this.contactServ.contactform.controls['emailFormControl'].setValue(elm.mail) ;
    this.contactServ.contactform.controls['phoneFormControl'].setValue(elm.phone) ;
    this.contactServ.contactform.controls['photoFormControl'].setValue(elm.photo) ;
    this.contactServ.fileUrl = elm.photo ;
  }
 
}

