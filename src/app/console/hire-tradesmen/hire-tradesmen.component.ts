import {Component, inject, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {GoogleMapsModule} from '@angular/google-maps';
import {NgForOf, NgStyle} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LoadingService} from '../../share/services/loading/loading.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AboutTradesmenComponent} from '../../share/components/about-tradesmen/about-tradesmen.component';

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
    NgStyle,
    MatDialogModule
  ],
  templateUrl: './hire-tradesmen.component.html',
  standalone: true,
  styleUrl: './hire-tradesmen.component.scss'
})
export class HireTradesmenComponent {
  readonly dialog = inject(MatDialog);

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

  submitJobRequest(f: FormGroupDirective) {

  }

  @Input() data: any;

  constructor(public loadingService: LoadingService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }

  previewProfile() {
    console.info('called')
    const dialogRef = this.dialog.open(AboutTradesmenComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // this.router.navigateByUrl('/console/playground/trades-person/profile');
    //window.open('http://localhost:4200/#/user-profile/process/'+id+'/about/'+id, '_blank');
  }
}
