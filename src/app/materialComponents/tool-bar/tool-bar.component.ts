import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginServService } from 'src/app/services/login-serv.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'logOut',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/logout-icon.png')
  );
   }
   ngOnInit() {
    this.typeACC = sessionStorage.getItem('account');
     this.afAuth.authState.subscribe( user=>{
       console.log(user);
      this.user = user ;
  })

  console.log("account "+ this.loginserv.account)

  }
  logout(){
this.loginserv.logout();
  }
 getUrl(){
    if (this.typeACC == "G") return '../../../assets/img/pngguru.com.png'
    if (this.typeACC == "FB") return '../../../assets/img/icons-facebook-button.png'
 }
}
