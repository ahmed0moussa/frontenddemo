import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loggedin } from 'src/app/services/models/loggedin';
import { RegisterService } from 'src/app/services/service/register.service';

@Component({
  selector: 'app-list-user-rh',
  templateUrl: './list-user-rh.component.html',
  styleUrls: ['./list-user-rh.component.css']
})
export class ListUserRhComponent {
  submitted=false;
  registrationForm!: FormGroup;
  user!:any;
  listeUser:any;
  iduser!:string

  constructor(private router: Router,private formBuilder: FormBuilder,
              private registerService:RegisterService,
              private toastr:ToastrService ){
    this.findall();
  }
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      cpassword: ['', Validators.required]
    });
}

  findall() {
    this.registerService.fiddalluser().subscribe(user => {
        this.listeUser = user;
      
    });
  }
setid(iduser:string ){
  this.iduser=iduser;
}
setupadateid(iduser:string) {
  this.setid(iduser);
  this.registerService.getUserById(this.iduser).subscribe(
    (data)=>{
      this.user=data;
      console.log(this.user)
      this.registrationForm.patchValue({
        lastName: this.user.lastName,
        firstName: this.user.firstName,
        email: this.user.email,
      });
   
    },
    error => {
      console.error('Error deleting user:', error);
      
    }
  );
}
  delete() {
    this.registerService.deleteUser(this.iduser).subscribe(
      () => {
        console.log('User deleted successfully');
        this.findall()
      },
      error => {
        console.error('Error deleting user:', error);
        
      }
    );
  }
  onSubmit( iduser: string){
    this.submitted = true;
    if (this.registrationForm.valid) {
      if (this.registrationForm.value.password !== this.registrationForm.value.cpassword) {
        
        this.registrationForm.get('cpassword')?.setErrors({ passwordMismatch: true });
        return; 
      }
    const formData = this.registrationForm.value;
    formData.password = this.registrationForm.value.password;
    this.registerService.updateUser(this.iduser, formData).subscribe(
      () => {
        console.log('User updated successfully',formData);
        this.toastr.success('utilisateur modifier avec succés!', 'Success');
        this.findall();
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
    
    
  
  }
}
openAddUserModal() {
  this.router.navigate(['/adduser']);
}
}
