import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {JobListingService} from '../../../services/job-listing/job-listing.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HireRequestFormComponent} from '../hire-request-form/hire-request-form.component';
import {MessagesService} from '../../../services/messages/messages.service';

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
    private router: Router,
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
    this.loadListingsByJobListingId()
  }

  loadListingsByJobListingId() {
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

    // blur active element before opening dialog
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      jobListingId: this.jobListingId,
      tradePersonId: this.listingDetails?.tradePersonDTO?.tradePersonId,
    };
    const dialogRef = this.dialog.open(HireRequestFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }

}
