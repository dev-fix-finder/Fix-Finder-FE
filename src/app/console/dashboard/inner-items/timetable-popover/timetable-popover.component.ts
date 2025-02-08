import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-timetable-popover',
  imports: [
    MatDialogModule,
    MatCardModule,
    MatCardContent,
    MatListModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './timetable-popover.component.html',
  standalone: true,
  styleUrl: './timetable-popover.component.scss'
})
export class TimetablePopoverComponent {
  @Input() selectedDate: Date;
  formattedDate: { month: string; year: number; ordinalSuffix: string; day: number; } | undefined;
  timetable: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private date: Date
  ) {
    this.selectedDate = date;
  }

  ngOnInit(): void {
    // this.formattedDate = this.timetableDate();
    // const requestedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
  }

  timetableDate() {
    const day = this.selectedDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return {
      day: day,
      ordinalSuffix: this.getOrdinalSuffix(day),
      month: monthNames[this.selectedDate.getMonth()],
      year: this.selectedDate.getFullYear()
    }
  }

  getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
