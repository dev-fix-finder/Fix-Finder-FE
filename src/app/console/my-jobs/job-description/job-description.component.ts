import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-job-description',
  imports: [
    CommonModule,
    MatButtonModule
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

  ngOnInit(): void {
    //load job details by jobId
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
