import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MenuItem } from '../models/MenuItems';
import { loggedin } from '../models/loggedin';

@Injectable({ providedIn: 'root' })
export class userProfileService {
  baseur="http://localhost:8080/api/"
  constructor(private http: HttpClient) { }
  registerRh(model:loggedin){
      return this.http.post<loggedin>(this.baseur+"signup/user",model);
    }
    fiddalluser(){
      return this.http.get<loggedin>(this.baseur+"users/all");
    }
    deleteUser(UserId: string): Observable<any> {
      
      return this.http.delete(this.baseur+"users/"+UserId);
    }
    getUserById(UserId: string){
      return this.http.get<loggedin>(this.baseur+"users/"+UserId);
    }
    updateUser(UserId:string,updatedUser: any){
      return this.http.put<loggedin>(this.baseur+"users/"+UserId, updatedUser);
    }
    updateMenu(UserId:string,menuItems:MenuItem[]){
      return this.http.put<MenuItem[]>(this.baseur+"users/updateMenu/"+UserId, menuItems);
    }
}
