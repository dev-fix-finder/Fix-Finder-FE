import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {GoogleMapsModule} from '@angular/google-maps';
import {NgForOf, NgStyle} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {LoadingService} from '../../share/services/loading/loading.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-hire-tradesmen',
  imports: [
    GoogleMapsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgForOf,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatDatepickerModule,
    NgStyle
  ],
  templateUrl: './hire-tradesmen.component.html',
  standalone: true,
  styleUrl: './hire-tradesmen.component.scss'
})
export class HireTradesmenComponent {

  hireForm = new FormGroup({
    category: new FormControl(),
    date: new FormControl(),
    min: new FormControl(),
    max: new FormControl(),
  })

  center: google.maps.LatLngLiteral = {lat: 6.9341, lng: 79.84997};
  zoom = 12;
  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'terrain', // or 'satellite', 'hybrid', 'terrain'
    disableDefaultUI: false, // Show default UI controls
    zoomControl: true, // Enable zoom control
    streetViewControl: false // Disable Street View control
  };

  /*onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const position = event.latLng.toJSON();
      this.markers.push({
        position,
        title: 'Trades-person Location'
      })
    }
  }*/

  submitJobRequest(f: FormGroupDirective) {

  }

  @Input() data:any;

  constructor(public loadingService: LoadingService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

  }

  previewProfile(id:any){
    this.router.navigateByUrl('/user-profile/process/'+id+'/about/'+id);
    //window.open('http://localhost:4200/#/user-profile/process/'+id+'/about/'+id, '_blank');
  }
}
