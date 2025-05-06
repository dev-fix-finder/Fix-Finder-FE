import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {JobPoolService} from '../../../share/services/job-pool/job-pool.service';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {UserStateService} from '../../../share/states/user-state/user-state.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-job-description',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './job-description.component.html',
  standalone: true,
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent implements OnInit {
  allSteps = ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'Completed', 'CLOSED'];
  steps = [...this.allSteps]; // Copy of normal steps
  currentStep = 0;
  statusLogs = [
    {date: new Date(), updatedBy: 'Admin', status: 'Requested', note: 'Initial request submitted'},
  ];
  jobDetails: any = {};
  jobId: any;
  userType: any;

  constructor(
    private jobPoolService: JobPoolService,
    private toastrService: ToastrService,
    private userStateService: UserStateService,
    public dialogRef: MatDialogRef<JobDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: any }
  ) {
  }

  ngOnInit(): void {
    // Load job details by jobId
    if (this.data && this.data.jobId) {
      this.jobId = this.data.jobId;
      this.loadJobDetailsById(this.data.jobId);
    }

    this.userStateService.userType$.subscribe(userType => {
      this.userType = userType
    })
  }

  loadJobDetailsById(jobId: string): void {
    this.jobPoolService.getJobDetailsById(jobId).subscribe(
      (response) => {
        if (response && response.data) {
          this.jobDetails = response.data;
          if (this.jobDetails?.jobStatus === 'REJECTED') {
            this.steps = ['PENDING', 'REJECTED'];
            this.currentStep = this.steps.indexOf(this.jobDetails?.jobStatus);
            console.log(this.currentStep)
          } else {
            this.currentStep = this.allSteps.indexOf(this.jobDetails?.jobStatus);
          }

        }
      },
      (error) => {
        console.error('Error loading job details:', error);
      }
    );
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
    this.jobPoolService.updateJobStatus(this.jobId, this.steps[this.currentStep]).subscribe(response => {
      if (response?.code === 200) {
        this.toastrService.success(`Job ${this.steps[this.currentStep]} successfully`, 'Success');
      } else {
        this.currentStep--;
        this.toastrService.error('Error updating job status', 'Error');
      }
    });

  }

  rejectJob() {
    if (this.currentStep === 0) {
      this.steps = ['PENDING', 'REJECTED'];
      this.currentStep = 1;
    }
    this.jobPoolService.updateJobStatus(this.jobId, this.steps[this.currentStep]).subscribe(response => {
      if (response?.code === 200) {
        this.toastrService.success(`Job ${this.steps[this.currentStep]} successfully`, 'Success');
      } else {
        this.currentStep--;
        this.toastrService.error('Error updating job status', 'Error');
      }
    });
  }
}
