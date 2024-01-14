import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvFileService {
  baseur = 'http://localhost:8080/api/candidate/';
  headers = new HttpHeaders();
  constructor(private Http: HttpClient) {
  }
  uploadFile(entretienId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    
    formData.append('file', file, file.name);

    const url = `${this.baseur}uploadFile/${entretienId}`;
    
    return this.Http.post(url, formData);
  }
  
}
