import {ChangeDetectionStrategy, Component, isDevMode} from '@angular/core';
import {CalendarCommonModule, CalendarModule} from 'angular-calendar';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-schedule',
  imports: [
    CalendarCommonModule,
    CalendarModule,
    FullCalendarModule
  ],
  templateUrl: './my-schedule.component.html',
  standalone: true,
  styleUrl: './my-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host: isDevMode() ? {} : { 'ngSkipHydration': '' },
})
export class MyScheduleComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',  // Ensure this view type is available
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    editable: false,
    events: [
      {
        title: 'Meeting',
        start: '2025-04-01T06:00:00',
        end: '2025-04-01T09:00:00'
      },
      {title: 'Conference', start: '2025-04-10'}
    ],
    eventClick: this.handleEventClick.bind(this),
  };

  handleEventClick(eventClickArg: EventClickArg) {
    const start = eventClickArg.event.start;
    const end = eventClickArg.event.end;
    if (start) {
      if (end === undefined || end === null) {
        Swal.fire({
          title: eventClickArg.event.title,
          html: `<h5>${this.formatDateTime(start)}</h5><p>Whole day</p>`,
          showConfirmButton: false,
          // icon: 'error',
          // confirmButtonText: 'Cool'
        })
      } else {
        Swal.fire({
          title: eventClickArg.event.title,
          html: `<h5>${this.formatDateTime(start)}</h5><p>${eventClickArg.event.start?.toLocaleTimeString()}  -  ${eventClickArg.event.end?.toLocaleTimeString()}</p>`,
          showConfirmButton: false,
          // icon: 'error',
          // confirmButtonText: 'Cool'
        })
      }
    }
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
