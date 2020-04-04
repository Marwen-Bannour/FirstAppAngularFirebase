import { Component, OnInit, ViewChild, Output , EventEmitter  } from '@angular/core';
import { Contact } from 'src/app/class/contact';
import {MatTableDataSource} from '@angular/material/table';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ContactsService } from 'src/app/services/contacts.service';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
  animations:[
    trigger('searchEnterLeave', [
      transition(':enter', [
        style({width: '0'}),
        animate('600ms', style({ width: '80%'})),
      ]),
      transition(':leave', [
        style({ width: '80%',opacity: 1 }),
        animate('400ms', style({ width: '0px' })),
      ]),
    ]),
    trigger('listInOut', [
      state('in', style({ transform: 'translateY(0)',opacity:1})),
      transition('void => *', [
        style({ transform: 'translateY(100%)',opacity:0.5}),
        animate(500)
      ])
    ]),
    trigger('anm',[
      transition('void => *',[
        style({ opacity:0}),
        animate(5000)])
  ])
  ]
})
export class ListContactsComponent implements OnInit {
 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() outEvent = new EventEmitter<number>();

  list:Contact[];
  displayedColumns : string[]=  ['photo', 'fullName','mail','phone', 'action'];
  dataSource = new MatTableDataSource(this.list);
  user: firebase.User;  
  search = false;
  loading : boolean = true;
  contactinf

  constructor(private contactServ: ContactsService,
              private storage: AngularFireStorage,
              public dialog: MatDialog,
              public dialogDelete: MatDialog,
              private _snackBar: MatSnackBar,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    try{
    this.afAuth.authState.subscribe( user=>{
      this.user = user;
      this.contactServ.getContacts(user.uid).subscribe(data => {
        if (data.length)
        {this.list = data.map(item => {
          this.loading = false ;
          return {
            id: item.payload.doc.id,
            ... <any>item.payload.doc.data()
          } as Contact;
        })
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.sort = this.sort; }
        else{
          this.loading = false;
          this.list= [];
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.sort = this.sort;
        }
      })
    })
  }catch(error){
    this.error("Get list contacts..");
  }

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

  onDelete(elm : Contact) {
    if (elm.filePath){
      this.storage.ref(elm.filePath).delete().subscribe( ()=>
       {this.contactServ.deleteContact(elm.id).then( () => 
        this.openSnackBar("Contact was successfully DELETED","OK") )
        .catch( ()=>
         this.error("Delete contact.")
        );
        
      })
    }
    if(elm.filePath == null){
       this.contactServ.deleteContact(elm.id).then( () => 
       this.openSnackBar("Contact was successfully DELETED","OK") )
       .catch( ()=>
        this.error("Delete contact..")
       );
    }
  }

  edit(elm : Contact){
    this.outEvent.emit(3);
    this.contactServ.formData = Object.assign({}, elm);
    this.contactServ.contactform.controls['idFormControl'].setValue(elm.id) ;
    this.contactServ.contactform.controls['fullNameFormControl'].setValue(elm.fullName) ;
    this.contactServ.contactform.controls['emailFormControl'].setValue(elm.mail) ;
    this.contactServ.contactform.controls['phoneFormControl'].setValue(elm.phone) ;
    this.contactServ.contactform.controls['photoFormControl'].setValue(elm.photo) ;
    this.contactServ.fileUrl = elm.photo ;
    this.contactServ.filePath = elm.filePath;
  }
  
  openDialog(contact): void {
    this.outEvent.emit(2);
    this.dialog.open(ContactDetailsComponent, {
      minWidth: '580px',
      height: '550px',
      panelClass: 'matDialog',
      data: {contact}
    });
  }

  openDialogDelete(elm : Contact) {
    const dialogRef = this.dialog.open(DeleteContactComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){this.onDelete(elm)}
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,action, {
      duration: 2000,
      horizontalPosition:'center',
      verticalPosition:'top'
    });
  }

  error(msg){
    this._snackBar.open("ERROR"+msg,"OK",{
      duration: 4000,
      horizontalPosition:'center',
      verticalPosition:'top'
    });
  }

}

