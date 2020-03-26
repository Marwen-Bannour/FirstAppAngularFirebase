import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/class/contact';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'] 
})
export class AddContactComponent implements OnInit {
contactform = new FormGroup({
  fullNameFormControl : new FormControl('', [
    Validators.required    
  ]),
  emailFormControl : new FormControl('', [
    Validators.required,
    Validators.email
  ]),
  phoneFormControl : new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*')
  ]),
  photoFormControl : new FormControl(''),
});
formControls = this.contactform.controls;
  
  fileUrl ;
  firebaseUrl = '';
  file;
  contact = new Contact();
  constructor(private contactService : ContactsService,
              private storage: AngularFireStorage) { }
 

  ngOnInit() {
   
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    const reader = new FileReader();
    reader.onload = (event: any) => {
         this.fileUrl = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  addContact(){
     if (this.contactform.valid) {
       
       if(!this.file){
      const data = {
        fullName : this.contactform.value['fullNameFormControl'],
        mail : this.contactform.value['emailFormControl'],
        phone : this.contactform.value['phoneFormControl'],
        photo :  null
      }
      console.log(data);
      this.contactService.addContact(data);
      this.resetForm();
    }
    if(this.file){
      this.addContactWhithPoto();
    }
    }else{console.log("errors");}
   }

  addContactWhithPoto(){
    var filePath = `${this.file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          const data = {
            fullName : this.contactform.value['fullNameFormControl'],
            mail : this.contactform.value['emailFormControl'],
            phone : this.contactform.value['phoneFormControl'],
            photo :  url
          }
        console.log(data);
        this.contactService.addContact(data);
        this.resetForm();
        })
      })
    ).subscribe();
  }
  
  resetForm(){
    this.contactform.reset();
    Object.keys(this.contactform.controls).forEach(key => {
            this.contactform.controls[key].setErrors(null)
          });
    this.fileUrl = null ;
    this.file= null ;
  }
}
