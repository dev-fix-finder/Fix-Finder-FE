import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {JobListingService} from '../../../services/job-listing/job-listing.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {HireRequestFormComponent} from '../hire-request-form/hire-request-form.component';

@Component({
  selector: 'app-profile-card',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './profile-card.component.html',
  standalone: true,
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit {
  selectedTab = 'Basic';
  jobListingId: any;
  listingDetails: any;
  readonly dialog = inject(MatDialog);

  packages = {
    Basic: {
      price: 15,
      description: 'Bronze-TEXT DESIGN ONLY TEXT LOGO only. No cartoon mascot or illustration.',
      delivery: 4,
      revisions: 'Unlimited Revisions',
      features: ['1 concept included', 'Logo transparency', 'Vector file', 'Printable file']
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobListingService: JobListingService,
    private toastr: ToastrService,
  ) {
  }

  get package() {
    // @ts-ignore
    return this.packages[this.selectedTab];
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    console.log('works')
    this.activatedRoute.paramMap.subscribe(data => {
      this.jobListingId = data.get('jobListingId')!;
    })
    this.loadListingsByTradesPersonId()
  }

  loadListingsByTradesPersonId() {
    console.log(this.jobListingId);
    this.jobListingService.getJobListingsByJobListingId(this.jobListingId).subscribe(response => {
      if (response.code === 200) {
        this.listingDetails = response.data;
        console.log(this.listingDetails)
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  bookTradesPerson() {
    console.log('book now');
    const dialogRef = this.dialog.open(HireRequestFormComponent,{
      width: '800px',
        data: this.jobListingId
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }
}
