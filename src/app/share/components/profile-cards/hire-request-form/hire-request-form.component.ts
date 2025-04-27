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
import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';

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
export class HireRequestFormComponent implements OnInit, AfterViewInit {

  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  jobForm!: FormGroup;
  userData: any;
  jobListingId: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',  // Ensure this view type is available
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    editable: true,
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

  constructor(
    private jobPoolService: JobPoolService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<HireRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calendarComponent.getApi().updateSize();
    }, 0);
  }

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

  // 📅 Handle calendar date click
  handleDateClick(arg: any): void {
    const selectedDate = arg.dateStr; // Example: "2025-05-01"
    console.log('Selected date:', selectedDate);

    this.jobForm.patchValue({
      requestedDate: selectedDate, // Set the clicked date
      requestedTime: '12:00'        // Optionally set a default time
    });

    this.toastr.info('Date selected: ' + selectedDate, 'Info');
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

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
