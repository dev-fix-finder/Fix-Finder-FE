import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {GoogleMapsModule} from '@angular/google-maps';
import {NgForOf} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './hire-tradesmen.component.html',
  standalone: true,
  styleUrl: './hire-tradesmen.component.scss'
})
export class HireTradesmenComponent {

  categoryForm = new FormGroup({
    category: new FormControl(),
  });
  hireForm = new FormGroup({
    title: new FormControl(),
    offerPrice: new FormControl(),
    description: new FormControl(),
  })

  center: google.maps.LatLngLiteral = {lat: 6.9341, lng: 79.84997};
  zoom = 14;
  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'hybrid', // or 'satellite', 'hybrid', 'terrain'
    disableDefaultUI: false, // Show default UI controls
    zoomControl: true, // Enable zoom control
    streetViewControl: false // Disable Street View control
  };

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const position = event.latLng.toJSON();
      this.markers.push({
        position,
        title: 'Trades-person Location'
      })
    }
  }

  submitJobRequest(f: FormGroupDirective) {

  }
}
