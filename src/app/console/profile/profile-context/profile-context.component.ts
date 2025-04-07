import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {GoogleMapsModule} from '@angular/google-maps';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    GoogleMapsModule,
    MatCheckboxModule,
  ],
  templateUrl: './profile-context.component.html',
  standalone: true,
  styleUrl: './profile-context.component.scss'
})
export class ProfileContextComponent {

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

  professions = [
    {value: 'carpenter', viewValue: 'Carpenter'},
    {value: 'plumber', viewValue: 'Plumber'},
    {value: 'gardener', viewValue: 'Gardener'},
    {value: 'electrician', viewValue: 'Electrician'},
    {value: 'painter', viewValue: 'Painter'},
    {value: 'mason', viewValue: 'Mason'},
    {value: 'mechanic', viewValue: 'Mechanic'}
  ];

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
    nic: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    gender: new FormControl(null),
    dob: new FormControl(null),
    email: new FormControl({value: '', disabled: true}, [Validators.email]),
    userId: new FormControl({value: '', disabled: true}),
    longitude: new FormControl({value: this.center?.lng, disabled: true}, [Validators.required]),
    latitude: new FormControl({value: this.center?.lat, disabled: true}, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required])
  });

  professionalInfoForm = new FormGroup({
    profession: new FormControl('', [Validators.required]),
    experience: new FormControl(null, [Validators.required]),
    skills: new FormControl(''),
    hourlyRate: new FormControl('', [Validators.required]),
    fixedServicePricing: new FormControl(''),
    availableDays: new FormControl([], [Validators.required]),
    availabilitySlots: new FormControl('')
  });

  portfolioForm = new FormGroup({
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
  });

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {
    this.markers = [
      {
        position: {lat: this.center.lat, lng: this.center.lng},
        title: 'Selected Location',
      },
    ];
  }


  onMapClick(event: google.maps.MapMouseEvent) {
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
  }

}
