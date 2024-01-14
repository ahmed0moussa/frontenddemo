import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private auth:AuthService,private route:Router){}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean >  {
    return this.auth.currentUser$.pipe(
      map(user=>{
        console.log("user",user)
        if(user==null){
          this.route.navigate(['accessdenied']);
          return false;
        }
       
        return true
      })
    );
  }
 
  
}
