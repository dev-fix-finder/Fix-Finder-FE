import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-tradesperson-dashboard',
  imports: [
    MatTabsModule,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    NgForOf
  ],
  templateUrl: './tradesperson-dashboard.component.html',
  standalone: true,
  styleUrl: './tradesperson-dashboard.component.scss'
})
export class TradespersonDashboardComponent {

  tabs = [
    {
      label: 'My Profile',
      icon: '',
      route: '/trade-person/dashboard/my-profile'
    },
    {
      label: 'Job Requests',
      icon: '',
      route: '/trade-person/dashboard/job-requests'
    },
    {
      label: 'Reviews',
      icon: '',
      route: '/trade-person/dashboard/reviews'
    },
    {
      label: 'Complaints',
      icon: '',
      route: '/trade-person/dashboard/complaints'
    },
  ];
}
