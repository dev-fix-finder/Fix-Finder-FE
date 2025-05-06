/*
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {JobPoolService} from '../../../services/job-pool/job-pool.service';
import {ToastrService} from 'ngx-toastr';
import {FullCalendarModule} from '@fullcalendar/angular';

@Component({
  selector: 'app-hire-request-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    FullCalendarModule
  ],
  templateUrl: './hire-request-form.component.html',
  standalone: true,
  styleUrl: './hire-request-form.component.scss'
})
export class HireRequestFormComponent implements OnInit {
  jobForm!: FormGroup;
  userData: any;
  jobListingId: any;

  constructor(
    private jobPoolService: JobPoolService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<HireRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.jobListingId = this.data;
    // @ts-ignore
    this.userData = JSON.parse(sessionStorage.getItem('personalData'));
    this.jobForm = new FormGroup({
      address: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      contactPersonName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      requestedDate: new FormControl('', Validators.required),
      requestedTime: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      offeredPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
      requiredHours: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;

      const jobData = {
        address: formData.address,
        contactNumber: formData.contactNumber,
        contactPersonName: formData.contactPersonName,
        requestedDate: formData.requestedDate,
        endDate: formData.endDate,
        endTime: formData.endTime,
        jobStatus: 'PENDING',
        offeredPrice: Number(formData.offeredPrice),
        requiredHours: Number(formData.requiredHours),
        description: formData.description
      };
      this.jobPoolService.hireTradePerson(jobData, this.userData.userId, this.jobListingId).subscribe(response => {
        if (response.code === 200) {
          this.toastr.success(response.message, 'success');
          this.dialogRef.close();
        } else {
          this.toastr.error(response.message, 'Error');
        }
      })
    } else {

      this.toastr.warning('Form is invalid', 'Warning');
      this.jobForm.markAllAsTouched();
    }

  }

  closeDialog() {

  }
}
*/
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {JobPoolService} from '../../../services/job-pool/job-pool.service';
import {ToastrService} from 'ngx-toastr';
import {TradespersonService} from '../../../services/tradesperson/tradesperson.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FormValidation} from '../../../form-validations/form-validation';

@Component({
  selector: 'app-hire-request-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    FullCalendarModule
  ],
  templateUrl: './hire-request-form.component.html',
  standalone: true,
  styleUrl: './hire-request-form.component.scss'
})
export class HireRequestFormComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: any;

  userData: any;
  jobListingId: any;
  tradePersonId: any;

  startDateTime: any;
  endDateTime: any;

  calendarEvents: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin
    ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: this.calendarEvents,
    height: 'auto',
    slotDuration: '00:30:00',
    slotLabelInterval: '00:30',
    slotMinTime: '06:00:00',
    slotMaxTime: '22:00:00'
  };

  jobForm = new FormGroup({
    address: new FormControl('', [Validators.required, FormValidation.text]),
    contactNumber: new FormControl('', [Validators.required, FormValidation.mobileNumber]),
    contactPersonName: new FormControl('', [Validators.required, FormValidation.nameValidation]),
    description: new FormControl('', [Validators.required, FormValidation.text]),
    offeredPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  // Flag to track if an event has been created
  private eventCreated: boolean = false;

  constructor(
    private jobPoolService: JobPoolService,
    private toastr: ToastrService,
    private tradespersonService: TradespersonService,
    public dialogRef: MatDialogRef<HireRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    console.log('Calendar select event:', selectInfo);

    // If an event has already been created, clear it automatically
    if (this.eventCreated) {
      this.clearSelectedTime();
      this.toastr.info('Previous selection cleared. New selection applied.', 'Information');
    }

    const startTime = new Date(selectInfo.start);
    const endTime = new Date(selectInfo.end);

    // Calculate time difference in minutes
    const timeDiff = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    console.log('Time difference in minutes:', timeDiff);

    // Validate the time selection
    if (timeDiff < 30) {
      this.toastr.error('Time selection must be at least 30 minutes', 'Invalid Selection');
      return;
    }

    // Check if the selected time overlaps with any existing allocated times
    const calendarApi = selectInfo.view.calendar;
    const events = calendarApi.getEvents();
    let hasOverlap = false;

    events.forEach(event => {
      if (event.id !== 'selected-time') {
        const eventStart = event.start?.getTime() || 0;
        const eventEnd = event.end?.getTime() || 0;
        const selectionStart = startTime.getTime();
        const selectionEnd = endTime.getTime();

        // Check for overlap
        if ((selectionStart >= eventStart && selectionStart < eventEnd) ||
            (selectionEnd > eventStart && selectionEnd <= eventEnd) ||
            (selectionStart <= eventStart && selectionEnd >= eventEnd)) {
          hasOverlap = true;
        }
      }
    });

    if (hasOverlap) {
      this.toastr.error('Your selection overlaps with an existing allocated time', 'Invalid Selection');
      return;
    }

    // Don't adjust the time - respect user selection
    console.log('Respecting user selected time difference:', timeDiff);

    this.startDateTime = this.getLocalIsoString(startTime);
    this.endDateTime = this.getLocalIsoString(endTime);

    // Create a calendar event to visualize the selection
    calendarApi.unselect(); // clear date selection

    // Add the event to the calendar
    calendarApi.addEvent({
      id: 'selected-time',
      title: 'Selected Time',
      start: selectInfo.start,
      end: selectInfo.end,
      backgroundColor: '#4caf50',
      borderColor: '#2e7d32'
    });

    this.eventCreated = true;
    this.toastr.success('Date and time selected', 'Success');
  }

  handleEventClick(clickInfo: EventClickArg): void {
    console.log('Calendar event click:', clickInfo);

    // If this is a read-only event (existing allocation), just show info
    if (clickInfo.event.id !== 'selected-time') {
      this.toastr.info('This time is already allocated', 'Information');
      return;
    }

    // If this is our selected time event, update the selection
    const startTime = new Date(clickInfo.event.start!);
    const endTime = new Date(clickInfo.event.end!);

    this.startDateTime = this.getLocalIsoString(startTime);
    this.endDateTime = this.getLocalIsoString(endTime);

    this.toastr.success('Selected time confirmed', 'Success');
  }

  ngOnInit(): void {
    this.jobListingId = this.data?.jobListingId;
    this.tradePersonId = this.data?.tradePersonId;

    // @ts-ignore
    this.userData = JSON.parse(sessionStorage.getItem('personalData'));

    // Disabled fetching existing times as per requirements
    this.fetchEvents()

    this.jobForm.get('contactNumber')?.valueChanges.subscribe(value => {
      if (value && value.startsWith('0')) {
        this.jobForm.get('contactNumber')?.setValue(value.substring(1), {emitEvent: false});
      }
    });
  }

  fetchEvents(): void {
    this.tradespersonService.getAllocatedTimes(this.tradePersonId).subscribe(response => {
      if (response.code === 200) {
        // Transform data to match FullCalendar format
        this.calendarEvents = response?.data.map((event: any) => {
          return {
            id: event.id || event.Id || String(Math.random()),
            title: event.title || event.Subject || 'Allocated Time',
            start: new Date(event.start || event.StartTime),
            end: new Date(event.end || event.EndTime),
            allDay: event.allDay || event.IsAllDay || false,
            backgroundColor: '#f44336', // Red for allocated times
            borderColor: '#d32f2f',
            editable: false,
            display: 'block'
          };
        });

        // Update calendar events
        if (this.calendarComponent && this.calendarComponent.getApi) {
          const calendarApi = this.calendarComponent.getApi();

          // Remove all existing events except the selected time
          const events = calendarApi.getEvents();
          // @ts-ignore
          events.forEach(event => {
            if (event.id !== 'selected-time') {
              event.remove();
            }
          });

          // Add the fetched events
          this.calendarEvents.forEach(event => {
            calendarApi.addEvent(event);
          });
        } else {
          // If calendar is not yet initialized, update the options
          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.calendarEvents
          };
        }

        console.log('Allocated times loaded:', this.calendarEvents);
      }
    });
  }

  onSubmit(): void {
    console.log('Calendar events:', this.calendarEvents);

    if (this.jobForm.valid) {
      // Validate time selection
      if (!this.startDateTime || !this.endDateTime) {
        this.toastr.warning('Please select a date and time from the calendar', 'Warning');
        return;
      }

      // Additional validation for time selection
      const startTime = new Date(this.startDateTime);
      const endTime = new Date(this.endDateTime);
      const timeDiff = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

      if (timeDiff < 30) {
        this.toastr.error('Time selection must be at least 30 minutes', 'Invalid Selection');
        return;
      }

      // Check if the selected time is in the past
      const now = new Date();
      if (startTime < now) {
        this.toastr.error('Cannot select a time in the past', 'Invalid Selection');
        return;
      }

      const formData = this.jobForm.value;

      const jobData = {
        address: formData.address,
        contactNumber: formData.contactNumber,
        contactPersonName: formData.contactPersonName,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime,
        jobStatus: 'PENDING',
        offeredPrice: Number(formData.offeredPrice),
        requiredHours: null,
        description: formData.description
      };

      console.log('Submitting job data:', jobData);

      this.jobPoolService.hireTradePerson(jobData, this.userData?.userId, this.jobListingId).subscribe(response => {
        if (response.code === 200) {
          this.toastr.success(response.message, 'Success');
          this.dialogRef.close();
        } else {
          this.toastr.error(response.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Form is invalid', 'Warning');
      this.jobForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getLocalIsoString(date: Date): string {
    const offsetMs = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 19);
  }

  formatSelectedTime(): string {
    if (!this.startDateTime || !this.endDateTime) {
      return '';
    }

    try {
      const startDate = new Date(this.startDateTime);
      const endDate = new Date(this.endDateTime);

      const formatOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      return `${startDate.toLocaleString(undefined, formatOptions)} - ${endDate.toLocaleString(undefined, formatOptions)}`;
    } catch (error) {
      return 'Invalid date format';
    }
  }

  clearSelectedTime(): void {
    if (!this.eventCreated) {
      this.toastr.info('No time selection to clear', 'Information');
      return;
    }

    // Reset the time selection
    this.startDateTime = null;
    this.endDateTime = null;
    this.eventCreated = false;

    // Remove the selected time event from the calendar
    if (this.calendarComponent && this.calendarComponent.getApi) {
      const calendarApi = this.calendarComponent.getApi();
      const events = calendarApi.getEvents();
      // @ts-ignore
      events.forEach(event => {
        if (event.id === 'selected-time') {
          event.remove();
        }
      });
      this.toastr.success('Time selection cleared', 'Success');
    }
  }
}
