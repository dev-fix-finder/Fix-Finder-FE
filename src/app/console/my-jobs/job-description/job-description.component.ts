import { Component } from '@angular/core';
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
export class JobDescriptionComponent {
  steps = ['Requested', 'Accepted', 'Ongoing', 'Completed'];
  currentStep = 0;

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }
  statusLogs = [
    { date: new Date(), updatedBy: 'Admin', status: 'Requested', note: 'Initial request submitted' },
    { date: new Date(), updatedBy: 'Manager', status: 'Assigned', note: 'Assigned to technician' },
    { date: new Date(), updatedBy: 'Technician', status: 'In Progress', note: 'Started the job' },
  ];
}
