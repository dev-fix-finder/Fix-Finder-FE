import {Component, ViewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ToastrService} from 'ngx-toastr';
import {CookieManagerService} from '../../share/services/cookie-manager/cookie-manager.service';
import {Router} from '@angular/router';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TradespersonService} from '../../share/services/tradesperson/tradesperson.service';
import {parseJson} from '@angular/cli/src/utilities/json-file';

@Component({
  selector: 'app-user-register',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf,
    GoogleMap,
    MapMarker,
    GoogleMapsModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  templateUrl: './user-register.component.html',
  standalone: true,
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {

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
    gender: new FormControl(null),
    dob: new FormControl(null),
    email: new FormControl('', [Validators.email]),
    userId: new FormControl(''),
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
    private router: Router,
    private tradesPersonService:TradespersonService
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
          title: 'Your Location',
        },
      ];

      console.log(`Marker placed at Lat: ${this.latitude}, Lng: ${this.longitude}`);

      this.personalInfoForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      })
    }
  }

  ngOnInit(): void {
  }

  tradesPersonRegistrationSubmit() {
    const formData = {
      ...this.personalInfoForm.getRawValue(),
      // ...this.professionalInfoForm.value,
      // ...this.portfolioForm.value,
      // ...this.bankingDetailsForm.value,
      // ...this.additionalInfoForm.value,
      // ...this.verificationForm.value,
    };
    // console.log('Form Submission Payload:', formData);
    // console.log(sessionStorage.getItem('personalData'))
    //@ts-ignore
    let userData = JSON.parse(sessionStorage.getItem('personalData'));
    // console.log(userData)

    this.tradesPersonService.saveTradePerson(formData,userData?.userId).subscribe(response => {
      if (response.status === 201) {
        this.toastr.success('Successfully created account','Success!');
        this.router.navigateByUrl('/console/verification').then();
      }
    })


  }

  private resetForm(form: FormGroupDirective) {
    form.resetForm();
    form.reset();
  }
}
