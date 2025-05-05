import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {JobListingService} from '../../share/services/job-listing/job-listing.service';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../share/services/category/category.service';

@Component({
  selector: 'app-hire-tradesmen',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './hire-tradesmen.component.html',
  standalone: true,
  styleUrl: './hire-tradesmen.component.scss'
})
export class HireTradesmenComponent implements OnInit {
  filterForm = new FormGroup({
    category: new FormControl('MASON'),
    minHourRate: new FormControl(''),
    maxHourRate: new FormControl(''),
  });

  tradespeople: any[] = [];
  categories: any[] = [];

  constructor(
    private jobListingService: JobListingService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadAllCategories();
    this.loadAllListings()
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      if (response.code === 200) {
        this.categories = response.data;
        console.log(this.categories)
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    });
  }

  loadAllListings() {
    let category: any = this.filterForm.get('category')?.value!;
    this.jobListingService.getAllJobsByFilter(category).subscribe(response => {
      if (response.code === 200) {
        this.tradespeople = response.data;
        console.log(this.tradespeople);
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  routeToTradesPersonDetails(tradesPerson: any) {
    const id = tradesPerson?.jobListingsId;
    if (id) {
      this.router.navigate(['/console/playground/trades-person/profile', id]);
    } else {
      this.toastr.error('jobListingsId  not found', 'Navigation Error');
    }
  }

}
