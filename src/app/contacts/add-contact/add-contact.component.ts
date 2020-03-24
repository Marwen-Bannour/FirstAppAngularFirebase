import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'] 
})
export class AddContactComponent implements OnInit {

  fullNameFormControl = new FormControl('', [
    Validators.required    
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*')
  ]);

  fileUrl ;
  file
  constructor() { }
 

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
}
