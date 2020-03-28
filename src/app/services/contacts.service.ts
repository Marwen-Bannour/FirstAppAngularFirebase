import { Injectable } from '@angular/core';
import { Contact } from '../class/contact';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
      
      formData : Contact ;
      contactform = new FormGroup({
        idFormControl : new FormControl(''),
        fullNameFormControl : new FormControl('', [
          Validators.required    
        ]),
        emailFormControl : new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        phoneFormControl : new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(8)
          ]),
          photoFormControl : new FormControl('')
      });
      formControls = this.contactform.controls;
      fileUrl;
      filePath;
      file;
     
  constructor(private fireStore: AngularFirestore) { }

  addContact(contact){
   return this.fireStore.collection('contacts').add(JSON.parse(JSON.stringify(contact)));
  }

  getContacts() {
    return this.fireStore.collection('contacts').snapshotChanges();
  }

  deleteContact(id: string){
    this.fireStore.doc('contacts/' + id).delete();
  }
  editContact(id,data){
   return this.fireStore.doc('contacts/' +id).update(data);
  }
  

}
