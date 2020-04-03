import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginServService {
  userData : any ;
  account : string ;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  loginWhithGoogle(){
    sessionStorage.setItem('account', "G");
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
     
  }

  loginWhithFacebook(){
    sessionStorage.setItem('account', "FB");
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());  
  }

  logout(){
    this.afAuth.auth.signOut().then(res=>{
      sessionStorage.removeItem('user');
      this.router.navigateByUrl('/');
    }).catch(res=>{
      console.log('erreur:'+res)
    });
  }
  
}
