import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TimetablePopoverComponent} from './inner-items/timetable-popover/timetable-popover.component';

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
    public dialog: MatDialog
  ) {
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
