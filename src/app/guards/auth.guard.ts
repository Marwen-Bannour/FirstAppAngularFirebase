import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../signup/login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate , CanDeactivate<LoginComponent> {
  constructor( private router: Router,
               private afAuth: AngularFireAuth ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    
    if(sessionStorage.getItem('user')){

      return true;
    }
    sessionStorage.clear();
    this.router.navigate(['']);
    return false ;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('user') === null) {

      return true;
    } else {

      return false;
    }}

}

