import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-enquiry',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './new-enquiry.html',
  styleUrl: './new-enquiry.css'
})
export class NewEnquiry {

  newEnquiryObject: any = {
    EnquiryId: 0,
    EnquiryTypeId: 0,
    EnquiryStatusId: 0,
    CustomerName: '',
    MobileNo: '',
    Email: '',
    Message: '',
    CreatedDate: new Date(),
    Resolution: ''
  }

  loading = false;

  masterSrv = inject(Master);

  typeList: Observable<any> = new Observable<any>();
  statusList: Observable<any> = new Observable<any>();

  constructor(private router: Router, private toastr: ToastrService) {
    this.typeList = this.masterSrv.getTypes();
    this.statusList = this.masterSrv.getStatus();

    this.statusList.subscribe(list => {
      if (list && list.length > 0) {
        this.newEnquiryObject.enquiryStatusId = list[0].statusId;
      }
    });

    this.typeList.subscribe(list => {
      if (list && list.length > 0) {
        this.newEnquiryObject.enquiryTypeId = list[0].typeId;
      }
    });
  }

  onSave() {
    this.loading = true;

    this.masterSrv.createEnquiry(this.newEnquiryObject).subscribe({
      next: (res: any) => {
        this.toastr.success('Enquiry created successfully', 'Success');

        // Delay navigation to show loading briefly
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/list']);
        }, 2000); // 2 second wait
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Failed to create enquiry', 'Error');
      }
    });
  }



  
}
