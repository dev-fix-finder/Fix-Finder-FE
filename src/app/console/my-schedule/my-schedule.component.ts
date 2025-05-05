import {ChangeDetectionStrategy, Component, OnInit, isDevMode, ChangeDetectorRef} from '@angular/core';
import {CalendarCommonModule, CalendarModule} from 'angular-calendar';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {TradespersonService} from '../../share/services/tradesperson/tradesperson.service';
import {MatDialog} from '@angular/material/dialog';
import {JobDescriptionComponent} from '../my-jobs/job-description/job-description.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-schedule',
  imports: [
    CalendarCommonModule,
    CalendarModule,
    FullCalendarModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './my-schedule.component.html',
  standalone: true,
  styleUrl: './my-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host: isDevMode() ? {} : { 'ngSkipHydration': '' },
})
export class MyScheduleComponent implements OnInit {
  userData: any;
  tradePersonId: any;
  calendarEvents: any[] = [];
  loading: boolean = true;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: false, // Events are view-only
    editable: false,
    events: this.calendarEvents,
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private tradespersonService: TradespersonService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get user data from session storage
    try {
      this.userData = JSON.parse(sessionStorage.getItem('personalData') || '{}');
      console.log('User data loaded:', this.userData);

      // Check if user data exists and has userId
      if (!this.userData || !this.userData.userId) {
        console.error('User data or userId is missing');
        this.toastr.error('User data is missing. Please log in again.', 'Error');
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      // Get tradesperson details by userId
      this.tradespersonService.getTradesPersonByUserId(this.userData.userId).subscribe(
        (response) => {
          console.log('Tradesperson response:', response);
          if (response && response.data && response.data?.tradePersonId) {
            this.tradePersonId = response.data.tradePersonId;
            console.log('Tradesperson ID:', this.tradePersonId);
            this.loadAllocatedTimes();
          } else {
            console.error('Tradesperson data or tradePersonId is missing');
            this.toastr.error('Could not load tradesperson details. Please try again later.', 'Error');
            this.loading = false;
            this.cdr.detectChanges();
          }
        },
        (error) => {
          console.error('Error getting tradesperson details:', error);
          this.toastr.error('Error loading tradesperson details. Please try again later.', 'Error');
          this.loading = false;
          this.cdr.detectChanges();
        }
      );
    } catch (error) {
      console.error('Error in ngOnInit:', error);
      this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  loadAllocatedTimes(): void {
    if (!this.tradePersonId) {
      this.toastr.error('Could not load schedule: Tradesperson ID is missing.', 'Error');
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    console.log('Loading allocated times for tradesperson ID:', this.tradePersonId);

    this.tradespersonService.getAllocatedTimes(this.tradePersonId).subscribe(
      (response) => {
        console.log('Allocated times response:', response);
        if (response && response.data) {
          try {
            // Transform data to match FullCalendar format
            this.calendarEvents = response.data.map((event: any) => {
              console.log('Processing event:', event);
              return {
                id: event.jobId || event.id || String(Math.random()),
                title: event.title || 'Job Appointment',
                start: new Date(event.startDateTime || event.start),
                end: new Date(event.endDateTime || event.end),
                allDay: event.allDay || false,
                extendedProps: {
                  jobId: event.jobId || event.id
                }
              };
            });

            console.log('Transformed calendar events:', this.calendarEvents);

            // Update calendar options with events
            this.calendarOptions = {
              ...this.calendarOptions,
              events: this.calendarEvents
            };

            console.log('Updated calendar options:', this.calendarOptions);

            if (this.calendarEvents.length === 0) {
              console.log('No events found');
            }
          } catch (error) {
            console.error('Error transforming event data:', error);
            this.toastr.error('Error processing schedule data.', 'Error');
          }
        } else {
          console.error('Response data is missing or invalid');
          this.toastr.warning('No schedule data available.', 'Warning');
        }

        this.loading = false;
        this.cdr.detectChanges(); // Force UI update
      },
      (error) => {
        console.error('Error loading allocated times:', error);
        this.toastr.error('Error loading schedule. Please try again later.', 'Error');
        this.loading = false;
        this.cdr.detectChanges(); // Force UI update
      }
    );
  }

  handleEventClick(eventClickArg: EventClickArg) {
    try {
      console.log('Event clicked:', eventClickArg);

      // Get the jobId from the event's extendedProps
      const jobId = eventClickArg.event.extendedProps?.['jobId'];
      console.log('Job ID from event:', jobId);

      if (jobId) {
        // Open job description dialog with the job ID
        this.dialog.open(JobDescriptionComponent, {
          width: '800px',
          data: { jobId: jobId }
        });
      } else {
        console.error('Job ID is missing from event');
        this.toastr.error('Cannot view job details: Job ID is missing.', 'Error');
      }
    } catch (error) {
      console.error('Error handling event click:', error);
      this.toastr.error('Error opening job details. Please try again.', 'Error');
    }
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
