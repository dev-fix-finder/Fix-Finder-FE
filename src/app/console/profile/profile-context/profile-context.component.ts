import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {TradespersonService} from '../../../share/services/tradesperson/tradesperson.service';
import {CategoryService} from '../../../share/services/category/category.service';
import {JobListingService} from '../../../share/services/job-listing/job-listing.service';

@Component({
  selector: 'app-profile-context',
  imports: [
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,

  ],
  templateUrl: './profile-context.component.html',
  standalone: true,
  styleUrl: './profile-context.component.scss'
})
export class ProfileContextComponent implements OnInit {

  center: google.maps.LatLngLiteral = {lat: 6.9341, lng: 79.84997}; // Default center
  zoom = 12;

  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];
  latitude: number | null = null;
  longitude: number | null = null;

  selectedMarkerTitle: string = '';

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
  };

  userData: any;
  tradesPersonData: any;

  categories: any[] = [];

  daysOfWeek = [
    {value: 'monday', viewValue: 'Monday'},
    {value: 'tuesday', viewValue: 'Tuesday'},
    {value: 'wednesday', viewValue: 'Wednesday'},
    {value: 'thursday', viewValue: 'Thursday'},
    {value: 'friday', viewValue: 'Friday'},
    {value: 'saturday', viewValue: 'Saturday'},
    {value: 'sunday', viewValue: 'Sunday'}
  ];

  personalInfoForm = new FormGroup({
    userId: new FormControl({value: '', disabled: true}),
    name: new FormControl('', [Validators.required]),
    nic: new FormControl(null, [Validators.required]),
    gender: new FormControl(null),
    dob: new FormControl(null, [Validators.required]),
    email: new FormControl({value: '', disabled: true}, [Validators.email]),
    mobile: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('')
  });

  professionalInfoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    pricePerHour: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  /*portfolioForm = new FormGroup({
    workSamples: new FormControl(''),
    testimonials: new FormControl(''),
    websiteLink: new FormControl(''),
    socialMediaLink: new FormControl('')
  });

  bankingDetailsForm = new FormGroup({
    accountNumber: new FormControl(''),
    bankBranch: new FormControl(''),
    bankName: new FormControl(''),
    paymentPreference: new FormControl(''),
    taxComplianceDocuments: new FormControl('')
  });

  additionalInfoForm = new FormGroup({
    emergencyContact: new FormControl(''),
    languageIds: new FormControl(''),
    workRadius: new FormControl(null)
  });

  verificationForm = new FormGroup({
    backgroundCheckConsent: new FormControl(false),
    governmentIdProof: new FormControl(''),
    professionalCertification: new FormControl('')
  });*/

  myListings: any[] = [];


  /*onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();

      // Update markers array to contain only one marker
      this.markers = [
        {
          position: {lat: this.latitude, lng: this.longitude},
          title: 'Selected Location',
        },
      ];

      console.log(`Marker placed at Lat: ${this.latitude}, Lng: ${this.longitude}`);

      this.personalInfoForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      })
    }
  }*/

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private tradespersonService: TradespersonService,
    private categoryService: CategoryService,
    private jobListingService: JobListingService,
  ) {
    /*  this.markers = [
        {
          position: {lat: this.center.lat, lng: this.center.lng},
          title: 'Selected Location',
        },
      ];*/
  }

  updateUser() {

  }

  ngOnInit(): void {
    // @ts-ignore
    this.userData = JSON.parse(sessionStorage.getItem('personalData'));
    this.loadTradesPersonByUserId();
    this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      if (response.code === 200) {
        this.categories = response.data;
        console.log(this.categories)
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  loadTradesPersonByUserId() {
    this.tradespersonService.getTradesPersonByUserId(this.userData?.userId).subscribe(response => {
      if (response.code === 200) {
        this.tradesPersonData = response.data;
        this.personalInfoForm.patchValue({
          userId: this.userData?.userId,
          name: this.userData.firstName + ' ' + this.userData.lastName,
          nic: this.tradesPersonData.nic,
          gender: this.tradesPersonData.gender,
          dob: this.tradesPersonData.dob,
          email: this.tradesPersonData.email,
          mobile: this.tradesPersonData.mobile,
          country: this.tradesPersonData.country,
          city: this.tradesPersonData.city,
          address: this.tradesPersonData.address,
        });
        this.loadListingsByTradesPersonId();
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  loadListingsByTradesPersonId() {
    this.jobListingService.getJobListingsByTradePersonId(this.tradesPersonData?.tradePersonId).subscribe(response => {
      if (response.code === 200) {
        this.myListings = response.data;
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }


  createJobListing() {
    let data = {
      "categoryId": this.professionalInfoForm.get("category")?.value,
      "description": this.professionalInfoForm.get("description")?.value,
      "pricePerHour": this.professionalInfoForm.get("pricePerHour")?.value,
      "title": this.professionalInfoForm.get("title")?.value
    }

    this.jobListingService.createJobListing(data, this.userData.userId).subscribe(response => {
      if (response.code === 200) {
        this.toastr.success(response.message, 'Success!');
        this.professionalInfoForm.reset();
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  editListing(listing: any): void {
    // Add your logic to open edit dialog or navigate
    console.log('Edit listing:', listing);
  }

  deleteListing(id: number): void {
    // Add your delete logic here
    console.log('Delete listing with ID:', id);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0).map((_, i) => i + 1);
  }
}
