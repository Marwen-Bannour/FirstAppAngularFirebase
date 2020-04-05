import { Component } from '@angular/core';
import { ConnectionService} from 'ng-connection-service'
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,
  animations:[
    trigger('anmCheck', [
      state('in', style({ transform: 'translateY(0)'})),
      transition('void => *', [
        style({ transform: 'translateY(100%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ExpMaterialWithFireb';
  
  status = 'ONLINE';
  isConnected = true;
 
  constructor(private connectionService: ConnectionService) {
  try{
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        console.log(this.status);
      }
      else {
        this.status = "OFFLINE";
        console.log(this.status);
      }
    })}catch{this.isConnected==false}
    
  }
 
}
