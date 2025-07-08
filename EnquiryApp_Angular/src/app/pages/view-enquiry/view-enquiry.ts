import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../services/master';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-enquiry',
  templateUrl: './view-enquiry.html',
  styleUrl: './view-enquiry.css',
  imports: [CommonModule,FormsModule,RouterModule]
})
export class ViewEnquiry implements OnInit {
  masterSrv = inject(Master);
  route = inject(ActivatedRoute);
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
        console.error("Error fetching enquiry:", err);
      }
    });
  }
}