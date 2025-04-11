import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {JobPoolService} from '../../../services/job-pool/job-pool.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-hire-request-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './hire-request-form.component.html',
  standalone: true,
  styleUrl: './hire-request-form.component.scss'
})
export class HireRequestFormComponent implements OnInit {
  jobForm!: FormGroup;
  userData: any;
  jobListingId: any;

  constructor(
    private jobPoolService: JobPoolService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<HireRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.jobListingId = this.data;
    // @ts-ignore
    this.userData = JSON.parse(sessionStorage.getItem('personalData'));
    this.jobForm = new FormGroup({
      address: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      contactPersonName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      requestedDate: new FormControl('', Validators.required),
      requestedTime: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      offeredPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
      requiredHours: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;

      const jobData = {
        address: formData.address,
        contactNumber: formData.contactNumber,
        contactPersonName: formData.contactPersonName,
        requestedDate: formData.requestedDate,
        endDate: formData.endDate,
        endTime: formData.endTime,
        jobStatus: 'PENDING',
        offeredPrice: Number(formData.offeredPrice),
        requiredHours: Number(formData.requiredHours),
        description: formData.description
      };
      this.jobPoolService.hireTradePerson(jobData, this.userData.userId, this.jobListingId).subscribe(response => {
        if (response.code === 200) {
          this.toastr.success(response.message, 'success');
          this.dialogRef.close();
        } else {
          this.toastr.error(response.message, 'Error');
        }
      })
    } else {

      this.toastr.warning('Form is invalid', 'Warning');
      this.jobForm.markAllAsTouched();
    }

  }

  closeDialog() {

  }
}
