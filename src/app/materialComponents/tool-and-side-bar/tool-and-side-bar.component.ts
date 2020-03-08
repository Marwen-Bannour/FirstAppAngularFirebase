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
          animate(2000)])
    ]),
    trigger('anmt1',[
      transition('void => *',[
        style({ opacity:0}),
        animate(1000)])
  ])
  ]
 /* animations:[
    trigger('anmt',[
        transition(':enter',[
          style({transform:'translateX(-70%)' }),
          animate(700)] )
    ])
  ]*/
})
export class ToolAndSideBarComponent implements OnInit {
 opened = false;
 exSpinner
  constructor() { }

  ngOnInit() {
    this.exSpinner=true;
    setTimeout(() =>{
      this.exSpinner = false ;
    },1000)
  }
 

}
