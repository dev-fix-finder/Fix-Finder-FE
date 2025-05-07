import {Component, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TimetablePopoverComponent} from './inner-items/timetable-popover/timetable-popover.component';
import {UserStateService} from '../../share/states/user-state/user-state.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    MatIconModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  selectedData: any;
  userType: any;

  constructor(
    public dialog: MatDialog,
    public userStateService: UserStateService
  ) {
  }

  ngOnInit(): void {
    this.loadData();

    this.userStateService.userType$.subscribe(userType => {
      this.userType = userType;
    })
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
