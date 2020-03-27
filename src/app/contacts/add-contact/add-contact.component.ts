import { Component, OnInit , Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/class/contact';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'] 
})
export class AddContactComponent implements OnInit {

  @Input() ActionEvent : string;

  contactData : Contact ;
  
  firebaseUrl = '';
  
  contact = new Contact();
  constructor(public contactService : ContactsService,
              private storage: AngularFireStorage,
              private _snackBar: MatSnackBar) { }
 

  ngOnInit() {
     
  }

  onFileChanged(event) {
    this.contactService.file = event.target.files[0];
    console.log(this.contactService.file);
    const reader = new FileReader();
    reader.onload = (event: any) => {
         this.contactService.fileUrl = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  addContact(){
     if (this.contactService.contactform.valid) {
       
       if(!this.contactService.file){
      const data = {
        fullName : this.contactService.contactform.value['fullNameFormControl'],
        mail : this.contactService.contactform.value['emailFormControl'],
        phone : this.contactService.contactform.value['phoneFormControl'],
        photo :  null
      }
      console.log(data);
      this.contactService.addContact(data).then( res =>  this.openSnackBar("Contact was successfully added","OK"))
      this.resetForm();
    }
    if(this.contactService.file){
      this.addContactWhithPhoto();
    }
    }else{console.log("errors");}
   }

  addContactWhithPhoto(){
    var filePath = `${this.contactService.file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.contactService.file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          const data = {
            fullName : this.contactService.contactform.value['fullNameFormControl'],
            mail : this.contactService.contactform.value['emailFormControl'],
            phone : this.contactService.contactform.value['phoneFormControl'],
            photo :  url
          }
        console.log(data);
        this.contactService.addContact(data).then( res =>  this.openSnackBar("Contact was successfully added","OK"))
        this.resetForm();
        })
      })
    ).subscribe();
  }
  
 editContact(){
  if (this.contactService.contactform.valid) {
       
    
   const data = {
     id : this.contactService.contactform.value['idFormControl'],
     fullName : this.contactService.contactform.value['fullNameFormControl'],
     mail : this.contactService.contactform.value['emailFormControl'],
     phone : this.contactService.contactform.value['phoneFormControl'],
     photo : this.contactService.contactform.value['photoFormControl']
   }
   console.log(data);
   
   if (data.photo == this.contactService.fileUrl){
     this.contactService.editContact(data.id,data).then( val => 
       this.openSnackBar("Contact was successfully changed","OK")
      )
     }else{
      var filePath = `${this.contactService.file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.contactService.file).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            data.photo =  url;
          this.contactService.editContact(data.id,data).then( val => 
            this.openSnackBar("Contact was successfully changed","OK")
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
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,action, {
      duration: 2000,
      horizontalPosition:'center'
    });
  }
}
  

