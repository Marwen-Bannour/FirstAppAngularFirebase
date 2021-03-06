import { Component, OnInit } from '@angular/core';
import{trigger, transition, animate, style} from '@angular/animations';

@Component({
  selector: 'app-tool-and-side-bar',
  templateUrl: './tool-and-side-bar.component.html',
  styleUrls: ['./tool-and-side-bar.component.css'],
  animations:[
    trigger('anmt',[
        transition('void => *',[
          style({ opacity:0}),
          animate(500)])
    ]),
    trigger('anmt1',[
      transition('void => *',[
        style({ opacity:0}),
        animate(200)])
  ])
  ]
})
export class ToolAndSideBarComponent implements OnInit {

 opened = false;
 exSpinner
 
  constructor() { }

  ngOnInit() {
    this.exSpinner=true;
    setTimeout(() =>{
      this.exSpinner = false ;
    },2000)
  }
 

}
