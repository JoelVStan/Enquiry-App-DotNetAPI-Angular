import { Routes } from '@angular/router';
import { EnquiryList } from './pages/enquiry-list/enquiry-list';
import { NewEnquiry } from './pages/new-enquiry/new-enquiry';
import { ViewEnquiry } from './pages/view-enquiry/view-enquiry';
import { EditEnquiry } from './pages/edit-enquiry/edit-enquiry';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: EnquiryList
    },
    {
        path: 'createNew',
        component: NewEnquiry
    },
    {
        path: 'view/:id',
        component: ViewEnquiry
    },
    {
        path: 'edit/:id',
        component: EditEnquiry // or a new EditEnquiry component if you want separate
    }

    
];
