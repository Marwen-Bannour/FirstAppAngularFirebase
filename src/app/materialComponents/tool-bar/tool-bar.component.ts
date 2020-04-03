import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginServService } from 'src/app/services/login-serv.service';


@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  user: firebase.User;
  typeACC : string ;

  constructor(
    private afAuth: AngularFireAuth,
    public loginserv: LoginServService,
    )
  {}

  ngOnInit() {
    this.typeACC = sessionStorage.getItem('account');
     this.afAuth.authState.subscribe( user=>{
      this.user = user ;
    })
  }

  logout(){
    this.loginserv.logout();
  }

  getUrl(){
    if (this.typeACC == "G") return '../../../assets/img/pngguru.com.png'
    if (this.typeACC == "FB") return '../../../assets/img/icons-facebook-button.png'
  }

}
