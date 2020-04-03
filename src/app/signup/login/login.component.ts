import { Component, OnInit } from '@angular/core';
import { LoginServService } from 'src/app/services/login-serv.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Progress:boolean = true ;
 
  constructor( 
    private loginServ : LoginServService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { 
    
  }

  ngOnInit() {

    this.afAuth.authState.subscribe( user =>{
      if( user ){
        sessionStorage.setItem('user', JSON.stringify(user));
        JSON.parse(sessionStorage.getItem('user'));
        this.router.navigateByUrl('/home')
        this.Progress= false
      }else (this.Progress = false)
 })
  }

  loginGoogle(){
    this.Progress = true ;
    this.loginServ.loginWhithGoogle();
  }

  loginFacebook(){
    this.Progress = true ;
    this.loginServ.loginWhithFacebook();
  }

}
