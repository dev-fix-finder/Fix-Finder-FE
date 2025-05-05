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
import {JobPoolService} from '../../../share/services/job-pool/job-pool.service';
import {ToastrService} from 'ngx-toastr';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FormValidation} from '../../../share/form-validations/form-validation';

@Component({
  selector: 'app-edit-job',
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
  templateUrl: './edit-job.component.html',
  standalone: true,
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: any;

  userData: any;
  jobId: string = '';
  jobDetails: any = {};

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
    public dialogRef: MatDialogRef<EditJobComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { jobId: string }
  ) {
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    // If an event has already been created, clear it automatically
    if (this.eventCreated) {
      this.clearSelectedTime();
      this.toastr.info('Previous selection cleared. New selection applied.', 'Information');
    }

    const startTime = new Date(selectInfo.start);
    const endTime = new Date(selectInfo.end);

    // Calculate time difference in minutes
    const timeDiff = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    // Validate the time selection
    if (timeDiff < 30) {
      this.toastr.error('Time selection must be at least 30 minutes', 'Invalid Selection');
      return;
    }

    // Check if the selected time overlaps with any existing allocated times
    const calendarApi = selectInfo.view.calendar;
    const events = calendarApi.getEvents();
    let hasOverlap = false;

    events.forEach((event: EventApi) => {
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
    // Get user data from session storage
    this.userData = JSON.parse(sessionStorage.getItem('personalData') || '{}');

    // Get job ID from dialog data
    if (this.data && this.data.jobId) {
      this.jobId = this.data.jobId;
      this.loadJobDetails();
    } else {
      this.toastr.error('Job ID is missing', 'Error');
      this.dialogRef.close();
    }
  }

  loadJobDetails(): void {
    this.jobPoolService.getJobDetailsById(this.jobId).subscribe(
      (response) => {
        if (response && response.data) {
          this.jobDetails = response.data;
          this.patchFormValues();
        } else {
          this.toastr.error('Failed to load job details', 'Error');
        }
      },
      (error) => {
        console.error('Error loading job details:', error);
        this.toastr.error('Error loading job details', 'Error');
      }
    );
  }

  patchFormValues(): void {
    // Patch form values from job details
    this.jobForm.patchValue({
      address: this.jobDetails.address || '',
      contactNumber: this.jobDetails.contactNumber || '',
      contactPersonName: this.jobDetails.contactPersonName || '',
      description: this.jobDetails.description || '',
      offeredPrice: this.jobDetails.price || 0,
    });

    // Set start and end date time
    if (this.jobDetails.startDateTime) {
      this.startDateTime = this.jobDetails.startDateTime;
    }

    if (this.jobDetails.endDateTime) {
      this.endDateTime = this.jobDetails.endDateTime;
    }

    // Add event to calendar if start and end times exist
    if (this.startDateTime && this.endDateTime) {
      this.addEventToCalendar();
    }
  }

  addEventToCalendar(): void {
    if (this.calendarComponent && this.calendarComponent.getApi) {
      const calendarApi = this.calendarComponent.getApi();

      // Remove any existing selected time event
      const events = calendarApi.getEvents();
      events.forEach((event: EventApi) => {
        if (event.id === 'selected-time') {
          event.remove();
        }
      });

      // Add the event to the calendar
      calendarApi.addEvent({
        id: 'selected-time',
        title: 'Selected Time',
        start: new Date(this.startDateTime),
        end: new Date(this.endDateTime),
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32'
      });

      this.eventCreated = true;
    }
  }

  onSubmit(): void {
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
        jobStatus: this.jobDetails.jobStatus || 'PENDING',
        offeredPrice: Number(formData.offeredPrice),
        description: formData.description
      };

      this.jobPoolService.updateJob(this.jobId, jobData).subscribe(
        (response) => {
          if (response.code === 200) {
            this.toastr.success(response.message || 'Job updated successfully', 'Success');
            this.dialogRef.close(true); // Close with success result
          } else {
            this.toastr.error(response.message || 'Failed to update job', 'Error');
          }
        },
        (error) => {
          console.error('Error updating job:', error);
          this.toastr.error('Error updating job', 'Error');
        }
      );
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
      events.forEach((event: EventApi) => {
        if (event.id === 'selected-time') {
          event.remove();
        }
      });
      this.toastr.success('Time selection cleared', 'Success');
    }
  }
}
