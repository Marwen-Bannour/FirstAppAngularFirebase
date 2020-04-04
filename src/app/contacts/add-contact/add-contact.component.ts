import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/class/contact';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'] 
})
export class AddContactComponent implements OnInit {

  @Input() ActionEvent : string;
  @Output() outEvent = new EventEmitter<number>();

  contactData : Contact ;
  firebaseUrl = '';
  user: firebase.User;
  contact = new Contact();
  loading : boolean = false;

  constructor(public contactService : ContactsService,
              private storage: AngularFireStorage,
              private _snackBar: MatSnackBar,
              private afAuth: AngularFireAuth)
  {}
 

  ngOnInit() {
    if(this.ActionEvent=="add"){
      this.contactService.fileUrl = null ;
    }
    this.afAuth.authState.subscribe( user=>{
      this.user = user ;
    })
  }

  onFileChanged(event) {
    this.contactService.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
         this.contactService.fileUrl = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  addContact(){
    if (this.contactService.contactform.valid) {
      this.loading = true ;
      if(!this.contactService.file){
        const data = {
          fullName : this.contactService.contactform.value['fullNameFormControl'],
          mail : this.contactService.contactform.value['emailFormControl'],
          phone : this.contactService.contactform.value['phoneFormControl'],
          photo :  null,
          filePath : null,
          userId : this.user.uid
        }
         
        this.contactService.addContact(data)
        .then( () =>{
          this.loading = false;
          this.outEvent.emit(2);
          this.resetForm();
          this.openSnackBar("Contact was successfully ADDED","OK") ;
        }).catch( ()=>
        this.error("Add contact.")
     )
      }
      if(this.contactService.file){
        this.addContactWhithPhoto();
      }
    }
  }

  addContactWhithPhoto(){
    var filePath = `${this.contactService.file?.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.contactService.file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          const data = {
            fullName : this.contactService.contactform.value['fullNameFormControl'],
            mail : this.contactService.contactform.value['emailFormControl'],
            phone : this.contactService.contactform.value['phoneFormControl'],
            photo :  url,
            filePath : filePath,
            userId : this.user.uid
          }
        this.contactService.addContact(data).then( () => {
          this.loading = false;
          this.outEvent.emit(2);
          this.resetForm();
          this.openSnackBar("Contact was successfully ADDED","OK");
         }).catch( ()=>
         this.error("Add contact..")
      )})
      })
    ).subscribe();
  }
  
  editContact(){
    if (this.contactService.contactform.valid) {
      this.loading = true ;
        const data= {
        id : this.contactService.contactform.value['idFormControl'],
        fullName : this.contactService.contactform.value['fullNameFormControl'],
        mail : this.contactService.contactform.value['emailFormControl'],
        phone : this.contactService.contactform.value['phoneFormControl'],
        photo : this.contactService.contactform.value['photoFormControl'],
        filePath : this.contactService.filePath
      }
  
     if (data.photo == this.contactService.fileUrl){
        this.contactService.editContact(data.id,data).then( () =>{
          this.loading = false;
          this.outEvent.emit(2);
          this.resetForm();
          this.openSnackBar("Contact was successfully CHANGED","OK")
        }).catch( ()=>
           this.error("Edit contact.")
        )
      }

      if( (!data.photo == this.contactService.fileUrl) && (this.contactService.filePath) ){
          this.storage.ref(this.contactService.filePath).delete().subscribe( ()=> {
            var filePath = `${this.contactService.file?.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
            const fileRef = this.storage.ref(filePath);
            this.storage.upload(filePath, this.contactService.file).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  data.photo =  url;
                  data.filePath = filePath ;
                  this.contactService.editContact(data.id,data).then( () =>
                  { this.loading = false;
                    this.outEvent.emit(2);
                    this.resetForm()
                    this.openSnackBar("Contact was successfully CHANGED","OK")
                  }).catch( ()=>
                  this.error("Edit contacts..")
               )
                })
              })
            ).subscribe();
          })
      }

      if(this.contactService.filePath == null){
        var filePath = `${this.contactService.file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.contactService.file).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              data.photo =  url;
              data.filePath = filePath ;
              this.contactService.editContact(data.id,data).then( () =>{
                this.loading = false;
                this.outEvent.emit(2);
                this.resetForm()
                this.openSnackBar("Contact was successfully CHANGED","OK")
              }).catch( ()=>
              this.error("Edit contacts...")
           )
            })
          })
        ).subscribe();
      } 
    }
  }

  resetForm(){
    this.contactService.contactform.reset();
    Object.keys(this.contactService.contactform.controls).forEach(key => {
      this.contactService.contactform.controls[key].setErrors(null)
    });
    this.contactService.fileUrl = null ;
   this.contactService.file= null ;
    this.contactService.filePath =null;
  }

  openSnackBar(message: string, action: string) {
   this._snackBar.open(message,action, {
     duration: 2000,
     horizontalPosition:'center',
     verticalPosition:'top'
   });
  }

  error(msg){
    this._snackBar.open("ERROR "+msg,"OK",{
      duration: 4000,
      horizontalPosition:'center',
      verticalPosition:'top'
    });
  }

}
  

