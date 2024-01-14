import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DecimalPipe } from '@angular/common';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



import { HttpClient } from '@angular/common/http';
import { EtudiantService } from 'src/app/services/service/etudiant.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [DecimalPipe]
})

// customer component
export class CustomersComponent {

  // bread crumb items
  idStudent!:string
  endItem: any
  students: any;
  studentForm!: UntypedFormGroup;
  submitted: boolean = false;
  public Editor = ClassicEditor;
  term: any;
  Studentlist: any;
  deleteId: any;
  editedStudent: any;
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;

  
  @ViewChild('pdfsave', { static: false }) pdfsave!: ElementRef 
  studentDetail: any;


  constructor(private router: Router,private http: HttpClient,private formBuilder: UntypedFormBuilder,public studentService:EtudiantService) {
    
  }

  ngOnInit(): void {
    

    // Fetch Data
    setTimeout(() => {
      this.findallStudent();
    
      document.getElementById('elmLoader')?.classList.add('d-none');
    }, 1200);

    /**
 * Form Validation
 */
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
  }
  //find all
  findallStudent(){
    this.studentService.getAllEtudiants().subscribe((data) => {
      console.log("etudiant" ,data)
      this.students = data;
      this.Studentlist = data;
      this.students = this.Studentlist.slice(0, 10);
      this.studentDetail = this.students[0];
    });
  }

  // Edit 
  editStudent(id: any) {
    this.router.navigate(['gestiondesetudiants/update/'+id]);

    // if (id >= 0 && id < this.students.length) {
    //   this.editedStudent = this.students[id];
      
    //   var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    //   modaltitle.innerHTML = 'Edit Student'
    //   var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    //   modalbtn.innerHTML = 'Update'
    //   document.querySelectorAll('#customer-img').forEach((element: any) => {
    //     element.src = this.students[id].image;
    //   });
    //   this.studentForm.controls['image'].setValue(this.students[id].image);
    //   this.studentForm.patchValue({
    //     id:this.editedStudent.id,
    //     image: this.editedStudent.image,
    //     cin: this.editedStudent.cin,
    //     prenom: this.editedStudent.prenom,
    //     nom: this.editedStudent.nom,
    //     email: this.editedStudent.email,
    //     gsm: this.editedStudent.gsm,
    //     parent: this.editedStudent.parent,
    //     adresse: this.editedStudent.adresse,
    //     telParent:  this.editedStudent.telParent ,
    //     emailParent:  this.editedStudent.emailParent,
    //     dateN:  this.editedStudent.dateN,
    //     lienN:  this.editedStudent.lienN,
    //     bac:  this.editedStudent.bac,
    //     anneeBac:  this.editedStudent.anneeBac,
    //     moyBac:  this.editedStudent.moyBac,

    //   });
      
    // } else {
    //   console.error('Invalid id:', id);
    // }
    
    
  }

  // Add 
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
                  
                
              },
              (error) => {
                console.error(' image uploded error',error);
                
              });
          }
          this.submitted=false;
          this.findallStudent();

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
                  
                
              },
              (error) => {
                console.error(' image uploded error',error);
                
              });
          }

        });
          this.submitted=false;
          this.findallStudent();
      }
      document.querySelectorAll('#customer-img').forEach((element: any) => {
        element.src = '';
      });
      setTimeout(() => {
        this.studentForm.reset();
      }, 1000);
      
    }
    
  }

  // File Upload
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

  removeStudent(id: any) {
    this.deleteId = id;
    
  }

  deleteStudent() {
    this.studentService.deleteEtudiant(this.deleteId).subscribe(() => {
      this.findallStudent();
      // Handle success if needed
    });
    
  }
  openModal(){
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'add Student'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'add'
    this.submitted = false;
    this.studentForm.reset();
    this.imageURL = undefined;
    this.imageInput.nativeElement.value = '';

    const defaultImagePath = 'assets/images/users/user-dummy-img.jpg';

    document.querySelectorAll('#customer-img').forEach((element: any) => {
      element.src = defaultImagePath;
    });
  }
  downloadPDF() {
    console.log("save");
    const options = {
      filename: 'student_overview.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3 },
      jsPDF: { } // Default settings
    };

    const content = this.pdfsave.nativeElement;

    // Create a new jsPDF instance
    const pdf = new jspdf.jsPDF();
    console.log('Before html2canvas');
    html2canvas(content, options.html2canvas).then((canvas) => {
      if (this.studentDetail.image) {
        this.http.get(this.studentDetail.image, { responseType: 'arraybuffer' })
          .subscribe(data => {
            console.log('Fetched image successfully');
            const imgData = 'data:image/jpeg;base64,' + btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            pdf.addImage(imgData, 'JPEG', 20, 20, 50, 30);
            
          }, error => {
            console.error('Error fetching image:', error);
          });
      }
      console.log('After html2canvas');
      const imgData = canvas.toDataURL('image/jpeg');
      pdf.addImage(imgData, 'JPEG', 15, 15, 150, 200);

      console.log('Before pdf.save with timeout');
      setTimeout(() => {
        pdf.save(options.filename);
        console.log('After pdf.save');
      }, 1000);
    });
   
  }


  // filterdata
  filterdata() {
    if (this.term) {
      // Convert both the term and data to lowercase for case-insensitive search
      const lowercaseTerm = this.term.toLowerCase();
      this.students = this.Studentlist.filter((student: any) =>
        student.email.toLowerCase().includes(lowercaseTerm) ||
        student.nom.toLowerCase().includes(lowercaseTerm) ||
        student.prenom.toLowerCase().includes(lowercaseTerm)
      );
    } else {
      // If the term is empty, show the first 10 students
      this.students = this.Studentlist.slice(0, 10);
    }
  
    // Update the display of the "No Result Found" message
    this.updateNoResultDisplay();
  }
  
 

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.term && this.students.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

  

  // view customer detail
  viewStudent(id: any) {
    this.studentDetail = this.students[id]
  }
  addEtudiants(){
    this.router.navigate(['gestiondesetudiants/create']);
  }
}
