import { Component } from '@angular/core';
import { ConnectionService} from 'ng-connection-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
