import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CalendarCommonModule, CalendarModule} from 'angular-calendar';
import {MatCalendar, MatDatepicker} from '@angular/material/datepicker';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-my-schedule',
  imports: [
    CalendarCommonModule,
    CalendarModule,
    MatCalendar,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatList,
    MatListItem,
    NgForOf,
    NgIf
  ],
  templateUrl: './my-schedule.component.html',
  standalone: true,
  styleUrl: './my-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyScheduleComponent {
  // List of specific dates to disable (YYYY-MM-DD format)
  disabledDates = ['2025-02-25','2025-02-26', '2025-02-28', '2025-03-05'];
  selectedDate: Date = new Date();
  formattedDate: { month: string; year: number; ordinalSuffix: string; day: number; } | undefined;
  timetable: any;

  myFilter = (d: Date | null): boolean => {
    if (!d) return false; // Ensure d is not null
    const day = d.getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)

    // Convert date to YYYY-MM-DD format for easy comparison
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // Disable  specific dates
    return !this.disabledDates.includes(dateStr);
  };

  onDateSelected($event: any) {
    console.log($event)
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
