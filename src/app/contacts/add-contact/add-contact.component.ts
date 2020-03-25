import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/class/contact';
import { AngularFirestore } from '@angular/fire/firestore';


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
});
formControls = this.contactform.controls;
  
  fileUrl ;
  file;
  contact = new Contact();
  constructor(private contactService : ContactsService) { }
 

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
           
             const data = {
               fullName : this.contactform.value['fullNameFormControl'],
               mail : this.contactform.value['emailFormControl'],
               phone : this.contactform.value['phoneFormControl']
             }
           console.log(data);
           this.contactService.addContact(data);
           this.contactform.reset();
           Object.keys(this.contactform.controls).forEach(key => {
            this.contactform.controls[key].setErrors(null)
          });
           
           
           }else{console.log("errors");}
           
           
  }
  resetForm(){
    this.contactform.reset();
           Object.keys(this.contactform.controls).forEach(key => {
            this.contactform.controls[key].setErrors(null)
          });
        }
}
