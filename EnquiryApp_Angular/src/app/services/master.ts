import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Master {

  constructor(private http: HttpClient) { }

  createEnquiry(enquiry: any) {
    return this.http.post('https://localhost:7038/api/EnquiryMaster/CreateNewEnquiry', enquiry);
  }

  getStatus(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7038/api/EnquiryMaster/GetAllStatus');
  }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7038/api/EnquiryMaster/GetAllTypes');
  }

  getAllEnquiry() {
    return this.http.get('https://localhost:7038/api/EnquiryMaster/GetAllEnquiries');
  }

  getEnquiryById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7038/api/EnquiryMaster/GetEnquiryById/${id}`);
  }

  deleteEnquiry(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7038/api/EnquiryMaster/DeleteEnquiryById/${id}`);
  }
  updateEnquiry(enquiry: any) {
    return this.http.put(`https://localhost:7038/api/EnquiryMaster/UpdateEnquiry`, enquiry);
  }


}
