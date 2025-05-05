import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {JobPoolService} from '../../../share/services/job-pool/job-pool.service';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

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
  allSteps = ['Requested', 'Accepted', 'Ongoing', 'Completed']; // Normal flow
  steps = [...this.allSteps]; // Copy of normal steps
  currentStep = 0;
  statusLogs = [
    {date: new Date(), updatedBy: 'Admin', status: 'Requested', note: 'Initial request submitted'},
  ];
  jobDetails: any = {};

  constructor(
    private jobPoolService: JobPoolService,
    public dialogRef: MatDialogRef<JobDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: string }
  ) {}

  ngOnInit(): void {
    // Load job details by jobId
    if (this.data && this.data.jobId) {
      this.loadJobDetailsById(this.data.jobId);
    }
  }

  loadJobDetailsById(jobId: string): void {
    this.jobPoolService.getJobDetailsById(jobId).subscribe(
      (response) => {
        if (response && response.data) {
          this.jobDetails = response.data;
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
  }

  rejectJob() {
    if (this.currentStep === 0) { // Only allow rejection at Requested
      this.steps = ['Requested', 'Rejected']; // Now only two steps
      this.currentStep = 1; // Move directly to Rejected

      this.statusLogs.push({
        date: new Date(),
        updatedBy: 'Tradesperson',
        status: 'Rejected',
        note: 'Job rejected by tradesperson'
      });
    }
  }
}
