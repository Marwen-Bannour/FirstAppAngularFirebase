import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServService {
user: firebase.User
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  loginWhithGoogle(){
     this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(res =>{
      if (res) { this.router.navigateByUrl('/home');}
     }).catch(res=>{ console.log('erreur:'+res)}
       
     );  
  }
  logout(){
    this.afAuth.auth.signOut().then(res=>{
      this.router.navigateByUrl('/');
    }).catch(res=>{
      console.log('erreur:'+res)
    });
    


  }
}
