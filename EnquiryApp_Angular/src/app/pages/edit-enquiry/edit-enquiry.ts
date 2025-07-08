import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Master } from '../../services/master';

@Component({
  selector: 'app-edit-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-enquiry.html',
  styleUrls: ['./edit-enquiry.css'] // plural!
})
export class EditEnquiry implements OnInit {
  masterSrv = inject(Master);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);

  enquiry: any = {};
  typeList: any[] = [];
  statusList: any[] = [];

  ngOnInit(): void {
    const enquiryId = this.route.snapshot.params['id'];

    this.masterSrv.getTypes().subscribe(types => this.typeList = types);
    this.masterSrv.getStatus().subscribe(status => this.statusList = status);

    this.masterSrv.getEnquiryById(enquiryId).subscribe({
      next: (res) => {
        this.enquiry = res;
      },
      error: (err) => {
        this.toastr.error("Failed to load enquiry", "Error");
        this.router.navigate(['/list']);
      }
    });
  }

  onUpdate(): void {
    console.log("Update payload:", this.enquiry); // add this
    this.masterSrv.updateEnquiry(this.enquiry).subscribe({
      next: (res) => {
        this.toastr.success("Enquiry updated successfully", "Success");
        this.router.navigate(['/list']);
      },
      error: (err) => {
        this.toastr.error("Failed to update enquiry", "Error");
      }
    });
  }
}