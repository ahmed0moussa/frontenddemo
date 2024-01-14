import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EtudiantService } from 'src/app/services/service/etudiant.service';

@Component({
  selector: 'app-create-etudiant',
  templateUrl: './create-etudiant.component.html',
  styleUrls: ['./create-etudiant.component.css']
})
export class CreateEtudiantComponent {
  idStudent!:string
  students: any;
  studentForm!: UntypedFormGroup;
  submitted: boolean = false;
  editedStudent:any
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;
  constructor(private route: ActivatedRoute ,private toastr:ToastrService,private router: Router,private http: HttpClient,private formBuilder: UntypedFormBuilder,public studentService:EtudiantService) {
    this.route.params.subscribe(data=>{
      this.idStudent=data['id'];
      
    });
  }
  ngOnInit(): void {

    this.studentForm = this.formBuilder.group({
      id: [''],
      matricule: [''],
      cin: ['', [Validators.required]],
      age: [null],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      adresse: [''],
      gsm: [''],
      parent: [''],
      telParent: [''],
      emailParent: ['', [ Validators.email]],
      dateN: [null ],
      lienN: [''],
      email: ['', [ Validators.email]],
      bac: ['', ],
      anneeBac: [null, ],
      moyBac: [null, ],
      image: [''],
    });
    const studentId = this.route.snapshot.paramMap.get('id');

    if (studentId) {
      // Update mode: Fetch student details and set them in the form
      this.studentService.getEtudiantById(studentId).subscribe((student) => {
        
            this.editedStudent = student
            
            var modaltitle = document.querySelector('.card-title') as HTMLAreaElement
            modaltitle.innerHTML = 'modifer etudient'
            var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
            modalbtn.innerHTML = 'modifer'
            document.querySelectorAll('#customer-img').forEach((element: any) => {
              element.src = this.editedStudent.image;
            });
            this.studentForm.controls['image'].setValue(this.editedStudent.image);
            this.studentForm.patchValue({
              id:this.editedStudent.id,
              image: this.editedStudent.image,
              cin: this.editedStudent.cin,
              prenom: this.editedStudent.prenom,
              nom: this.editedStudent.nom,
              email: this.editedStudent.email,
              gsm: this.editedStudent.gsm,
              parent: this.editedStudent.parent,
              adresse: this.editedStudent.adresse,
              telParent:  this.editedStudent.telParent ,
              emailParent:  this.editedStudent.emailParent,
              dateN:  this.editedStudent.dateN,
              lienN:  this.editedStudent.lienN,
              bac:  this.editedStudent.bac,
              anneeBac:  this.editedStudent.anneeBac,
              moyBac:  this.editedStudent.moyBac,
      
            });
            
          
        this.imageURL = student.image; // Assuming 'image' is the property in your student model
      });
    }
  
  }
  saveStudent() {
    this.submitted=true;
    const fileInputElement = this.imageInput.nativeElement;
    const selectedImage = fileInputElement.files && fileInputElement.files[0];
    if (this.studentForm.valid) {
      if (this.studentForm.get('id')?.value) {
        const updatedData = this.studentForm.value;
        // this.store.dispatch(updatecustomerData({ updatedData }));
        this.studentService.updateEtudiant(updatedData.id, updatedData).subscribe((response) => {
          console.log("data update",response)
          
          if (selectedImage && selectedImage instanceof File) {
            this.studentService.uplodImage(response.id,selectedImage).subscribe(
              (data) => {
                console.log('image uploded successfully', data);
                this.toastr.success('Data saved successfully!', 'Success');
                
              },
              (error) => {
                console.error(' image uploded error',error);
                
                
              });
              
          }
          this.router.navigate(['gestiondesetudiants']);
          this.toastr.success('Data updated successfully!', 'Success');
          this.submitted=false;
          

        });
      }
      else {
        
        const newData = this.studentForm.value
        delete newData.id;
        // this.store.dispatch(addcustomerData({ newData }))
        this.studentService.createEtudiant(newData).subscribe((response) => {
          console.log("data saved",response)
          

          if (selectedImage && selectedImage instanceof File) {
            this.studentService.uplodImage(response.id,selectedImage).subscribe(
              (data) => {
                console.log('image uploded successfully', data);
                this.router.navigate(['gestiondesetudiants']);
                this.toastr.success('Data saved successfully!', 'Success');
                
              },
              (error) => {
                console.error(' image uploded error',error);
                
              });
              
          }
          this.router.navigate(['gestiondesetudiants']);
          this.toastr.success('Data saved successfully!', 'Success');
        });
          this.submitted=false;
          
      }
      document.querySelectorAll('#customer-img').forEach((element: any) => {
        element.src = '';
      });
      setTimeout(() => {
        this.studentForm.reset();
      }, 1000);
      
    }
    
  }
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#customer-img').forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.studentForm.controls['img'].setValue(this.imageURL);
    };
    reader.readAsDataURL(file);
  }
}
