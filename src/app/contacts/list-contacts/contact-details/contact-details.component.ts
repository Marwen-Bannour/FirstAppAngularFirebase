import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/class/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  animations:[
    trigger('searchEnterLeave', [
      transition(':enter', [
        style({opacity: 0}),
        animate('600ms', style({opacity: 1})),
      ]),
      transition(':leave', [
        style({opacity: 1 }),
        animate('600ms', style({opacity: 0 })),
      ]),
    ])
  ]
})
export class ContactDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    public contactService : ContactsService) {}
  
  ngOnInit(): void {
    this.contactService.fileUrl = this.data.contact.photo ;
  }

  onNoClick(): void {
    this.contactService.fileUrl = null;
    this.dialogRef.close();
  }

}
