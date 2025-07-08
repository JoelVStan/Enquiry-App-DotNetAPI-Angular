import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnquiry } from './edit-enquiry';

describe('EditEnquiry', () => {
  let component: EditEnquiry;
  let fixture: ComponentFixture<EditEnquiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEnquiry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEnquiry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
