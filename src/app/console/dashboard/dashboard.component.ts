import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TimetablePopoverComponent} from './inner-items/timetable-popover/timetable-popover.component';
import {
  ProfileCardsContextComponent
} from '../../share/components/profile-cards/profile-cards-context/profile-cards-context.component';
import {
  TradespersonDashboardComponent
} from './inner-items/tradesperson/tradesperson-dashboard/tradesperson-dashboard.component';
import {NgForOf} from '@angular/common';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    MatIconModule,
    MatDatepickerModule,
    // NgForOf,

  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedData: any;

  constructor(
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

  }

  onDateSelected(date: Date): void {
    this.dialog.open(TimetablePopoverComponent, {
      panelClass: 'mat-dialog-timetable',
      width: '450px',
      data: date
    });
  }

}
