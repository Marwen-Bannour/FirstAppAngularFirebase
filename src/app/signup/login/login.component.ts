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
  ) { }

  ngOnInit() {

    this.afAuth.authState.subscribe( user =>{
      if( user ){
        sessionStorage.setItem('user', user.toJSON().toString() );
        this.router.navigateByUrl('/home')
        this.Progress= false
      }else (this.Progress = false)
 })
  }

  loginGoogle(){
    console.log('login...');
    this.Progress = true ;
    this.loginServ.loginWhithGoogle();

  }
  loginFacebook(){
    console.log('login...');
    this.Progress = true ;
    this.loginServ.loginWhithFacebook();

  }

}
