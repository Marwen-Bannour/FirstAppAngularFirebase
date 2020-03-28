import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/class/contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    public contactService : ContactsService) {}
  
    ngOnInit(): void {
      this.contactService.fileUrl = this.data.contact.photo ;
    console.log(this.data)
  }

  onNoClick(): void {
    this.contactService.fileUrl = null;
    this.dialogRef.close();
  }

}
