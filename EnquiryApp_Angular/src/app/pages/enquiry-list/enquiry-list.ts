import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../services/master';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enquiry-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css'
})
export class EnquiryList implements OnInit {
  constructor(private toastr: ToastrService) {}
  masterSrv= inject(Master);
  enquiryList: any[] = [];

  // Counters
  totalEnquiries = 0;
  openEnquiries = 0;
  inProgressEnquiries = 0;
  resolvedEnquiries = 0;

  ngOnInit(): void {
    this.masterSrv.getAllEnquiry()
      .subscribe((res:any) => {
        this.enquiryList = res;
        this.calculateStats();
      })
  }
  calculateStats() {
    this.totalEnquiries = this.enquiryList.length;

    this.openEnquiries = this.enquiryList.filter(e =>
      e.enquiryStatusId === 1 || e.enquiryStatusId === 4 // New or On-Hold
    ).length;

    this.inProgressEnquiries = this.enquiryList.filter(e =>
      e.enquiryStatusId === 2
    ).length;

    this.resolvedEnquiries = this.enquiryList.filter(e =>
      e.enquiryStatusId === 3
    ).length;
  }

  getStatusClass(statusId: number): string {
    switch (statusId) {
      case 1: // New
      case 4: // On-Hold
        return 'status-open';
      case 2: // In Progress
        return 'status-progress';
      case 3: // Resolved
        return 'status-resolved';
      default:
        return '';
    }
  }
  onDelete(id: number) {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      this.masterSrv.deleteEnquiry(id).subscribe({
        next: () => {
          this.enquiryList = this.enquiryList.filter(e => e.enquiryId !== id);
          this.toastr.warning('Enquiry deleted');
        },
        error: () => {
          this.toastr.error('Failed to delete enquiry');
        }
      });
    }
  }

}
