import { Component, OnInit} from '@angular/core';
import{trigger, transition, animate, style, state} from '@angular/animations';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations:[
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)'})),
      transition('void => *', [
        style({ transform: 'translateX(100%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('anm',[
      transition('void => *',[
        style({ opacity:0}),
        animate(2000)])
  ])
  ]
})
export class ContactsComponent implements OnInit {
  cols : number = 2 ;
  ActionEvent: String = "" ;
  constructor( private contactService : ContactsService) { }

  ngOnInit() {
  }
  openAdd(){
    this.cols = 3 ;
    this.ActionEvent= "add";
  }
  closeAdd(){
    this.cols = 2 ;
    this.ActionEvent= null ;
    this.resetForm();
    
  }
  receiveCols($event){ 
    this.cols = $event ;
    this.ActionEvent="edit";
  }
  receiveColsClose($event){ 
    this.cols = $event ;
    this.ActionEvent="";
  }
  resetForm(){
    this.contactService.contactform.reset();
    Object.keys(this.contactService.contactform.controls).forEach(key => {
            this.contactService.contactform.controls[key].setErrors(null)
          });
    this.contactService.fileUrl = null ;
    this.contactService.file= null ;
    this.contactService.filePath = null;
  }
}
