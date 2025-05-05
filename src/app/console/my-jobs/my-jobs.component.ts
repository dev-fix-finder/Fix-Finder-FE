import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {UserStateService} from '../../share/states/user-state/user-state.service';
import {JobListingService} from '../../share/services/job-listing/job-listing.service';
import {JobPoolService} from '../../share/services/job-pool/job-pool.service';
import {TradespersonService} from '../../share/services/tradesperson/tradesperson.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {JobDescriptionComponent} from './job-description/job-description.component';
import {EditJobComponent} from './edit-job/edit-job.component';

@Component({
  selector: 'app-my-jobs',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './my-jobs.component.html',
  standalone: true,
  styleUrl: './my-jobs.component.scss'
})
export class MyJobsComponent implements OnInit, OnDestroy {
  userType: any;
  userData: any;
  private userTypeSubscription: Subscription | undefined;
  jobList = [
    {
      id: 'job001',
      title: 'Facilities Superintendent and or Foreman',
      tags: 'Supervising, Repair, Carpenter',
      description:
        'Performs skilled, semi-skilled and routine tasks as trades person related to the maintenance of buildings and facilities.',
      price: 10000.0
    },
    {
      id: 'job002',
      title: 'Electrician and Lighting Technician',
      tags: 'Wiring, Fixture Repair, Power Checks',
      description:
        'Responsible for installing, repairing, and maintaining electrical systems and lighting in residential and commercial buildings.',
      price: 7500.0
    },
    {
      id: 'job003',
      title: 'AC Repair and Maintenance',
      tags: 'HVAC, Ventilation, Refrigeration',
      description:
        'Diagnose and repair air conditioning units, replace components, and ensure optimal cooling performance.',
      price: 8500.0
    },
    {
      id: 'job004',
      title: 'Tile and Grout Specialist',
      tags: 'Flooring, Waterproofing, Bathroom Setup',
      description:
        'Apply and maintain ceramic or porcelain tile, clean and seal grout, and ensure surface waterproofing.',
      price: 9200.0
    }
  ];

  constructor(
    private userStateService: UserStateService,
    private jobListingService: JobListingService,
    private jobPoolService: JobPoolService,
    private tradespersonService: TradespersonService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    // Get user data from session storage
    this.userData = JSON.parse(sessionStorage.getItem('personalData') || '{}');

    // Subscribe to user type changes
    this.userTypeSubscription = this.userStateService.userType$.subscribe(userType => {
      console.log('user type', userType);
      this.userType = userType;
      this.loadJobs(userType);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    if (this.userTypeSubscription) {
      this.userTypeSubscription.unsubscribe();
    }
  }

  loadJobs(userType: string): void {
    if (userType === 'CLIENT') {
      // For CLIENT users, load jobs by userId
      if (this.userData?.userId) {
        this.jobPoolService.getJobsByUserId(this.userData?.userId).subscribe(
          (response) => {
            if (response && response.data) {
              this.jobList = response.data;
            }
          },
          (error) => {
            console.error('Error loading jobs for client:', error);
          }
        );
      }
    } else if (userType === 'TRADES-PERSON') {
      // For TRADES-PERSON users, get tradesperson details by userId, then load jobs by tradePersonId
      if (this.userData?.userId) {
        this.tradespersonService.getTradesPersonByUserId(this.userData?.userId).subscribe(
          (response) => {
            if (response && response.data && response.data?.tradePersonId) {
              const tradePersonId = response.data?.tradePersonId;
              this.jobPoolService.getJobsByTradePersonId(tradePersonId).subscribe(
                (jobsResponse) => {
                  if (jobsResponse && jobsResponse.data) {
                    this.jobList = jobsResponse.data;
                  }
                },
                (error) => {
                  console.error('Error loading jobs for tradesperson:', error);
                }
              );
            }
          },
          (error) => {
            console.error('Error getting tradesperson details:', error);
          }
        );
      }
    }
  }

  /**
   * Open job description dialog when user clicks the View Details button
   * @param jobId The ID of the job to view
   */
  viewJobDetails(jobId: string): void {
    if (jobId) {
      // Open job description dialog with the job ID
      this.dialog.open(JobDescriptionComponent, {
        width: '800px',
        data: { jobId: jobId }
      });
    } else {
      console.error('Job ID is missing');
    }
  }

  /**
   * Open edit job dialog when user clicks the Edit Job button
   * @param jobId The ID of the job to edit
   */
  editJob(jobId: string): void {
    if (jobId) {
      // Open edit job dialog with the job ID
      const dialogRef = this.dialog.open(EditJobComponent, {
        width: '900px',
        data: { jobId: jobId }
      });

      // Refresh job list when dialog is closed with a successful update
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          // Reload jobs with current user type
          this.loadJobs(this.userType);
        }
      });
    } else {
      console.error('Job ID is missing');
    }
  }
}
