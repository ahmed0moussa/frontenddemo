import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loggedin } from '../models/loggedin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseur="http://localhost:8080/api/"
  constructor(private Http: HttpClient) {}
  registeruser(model:loggedin){
    return this.Http.post<loggedin>(this.baseur+"signup/user",model);
  }
  fiddalluser(){
    return this.Http.get<loggedin>(this.baseur+"users/all");
  }
  deleteUser(UserId: string): Observable<any> {
    
    return this.Http.delete(this.baseur+"users/"+UserId);
  }
  getUserById(UserId: string){
    return this.Http.get<loggedin>(this.baseur+"users/"+UserId);
  }
  updateUser(UserId:string,updatedUser: any){
    return this.Http.put<loggedin>(this.baseur+"users/"+UserId, updatedUser);
  }

}
