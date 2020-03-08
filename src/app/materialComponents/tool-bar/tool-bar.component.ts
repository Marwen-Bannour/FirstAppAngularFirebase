import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginServService } from 'src/app/services/login-serv.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  user: firebase.User
  constructor(
    private afAuth: AngularFireAuth,
    private loginserv: LoginServService
  ) { }

  ngOnInit() {
     this.afAuth.authState.subscribe( user=>{
       console.log(user);
      this.user = user ;
  })
  }
  logout(){
this.loginserv.logout();
  }

}
