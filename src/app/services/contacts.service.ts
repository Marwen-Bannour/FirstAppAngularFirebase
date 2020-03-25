import { Injectable } from '@angular/core';
import { Contact } from '../class/contact';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
      formData : Contact ;
     
  constructor(private fireStore: AngularFirestore) { }

  addContact(contact){
    this.fireStore.collection('contacts').add(JSON.parse(JSON.stringify(contact)));
  }

  getContacts() {
    return this.fireStore.collection('contacts').snapshotChanges();
}

deleteContact(id: string){
  this.fireStore.doc('contacts/' + id).delete();
}
}
