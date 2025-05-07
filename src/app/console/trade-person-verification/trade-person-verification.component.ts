import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {TradespersonService} from '../../share/services/tradesperson/tradesperson.service';
import {debounceTime} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-trade-person-verification',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './trade-person-verification.component.html',
  styleUrl: './trade-person-verification.component.scss'
})
export class TradePersonVerificationComponent implements OnInit {

  verificationRequests: any = [];
  statusOptions: string[] = ['PENDING', 'APPROVED', 'DECLINED'];

  branch: string = '';
  userType: string = '';
  employmentState: string = 'ALL';
  employeeAvailability: string = 'ALL';
  selectedRequest: any;

  form = new FormGroup({
    tradePersonId: new FormControl({value: '', disabled: true}),
    tradePersonName: new FormControl({value: '', disabled: true}),
    referenceName1: new FormControl({value: '', disabled: true}),
    referenceMobile1: new FormControl({value: '', disabled: true}),
    referenceName2: new FormControl({value: '', disabled: true}),
    referenceMobile2: new FormControl({value: '', disabled: true}),
    status: new FormControl(''),

  });

  searchForm = new FormGroup({
    branch: new FormControl(''),
    userType: new FormControl(''),
    employmentState: new FormControl(this.employmentState),
    employeeAvailability: new FormControl(this.employeeAvailability)
  });

  constructor(
    private tradespersonService: TradespersonService,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getAllVerificationRequests();

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        // @ts-ignore
        this.branch = data.branch;
        // @ts-ignore
        this.userType = data.userType;
        // @ts-ignore
        this.employmentState = data.employmentState;
        // @ts-ignore
        this.employeeAvailability = data.employeeAvailability;
        this.getAllVerificationRequests();
      });
  }

  viewTradePerson(tradePerson: any): void {
    this.selectedRequest = tradePerson;
    console.log(this.selectedRequest);
    this.form.patchValue({
      tradePersonId: tradePerson.tradePersonId || '',
      tradePersonName: tradePerson.tradePersonName || '',
      referenceName1: tradePerson.referenceName1 || '',
      referenceMobile1: tradePerson.referenceMobile1 || '',
      referenceName2: tradePerson.referenceName2 || '',
      referenceMobile2: tradePerson.referenceMobile2 || '',
      status: tradePerson.status || ''
    });
  }

  getAllVerificationRequests() {
    this.tradespersonService.allVerifications().subscribe(response => {
      this.verificationRequests = response.data;
      console.log(this.verificationRequests)
    }, error => {
      this.toastrService.error('Something went wrong!', 'Error!');
    })
  }

  submitForm(): void {
    if (this.form.valid) {
      const updatedData = this.form.value;
      console.log('Submitting form data:', updatedData);
      const data = {
        comment: "",
        decision: updatedData.status,
        requestId: this.selectedRequest?.id
      }

      this.tradespersonService.updateTradepersonStatus(data).subscribe(response => {
        if (response.code === 200) {
          this.toastrService.success('Trade person Status Updated Successfully!', 'Success!');
        } else {
          this.toastrService.error('Something went wrong!', 'Error!');
        }
      })
    }
  }

  private refreshForm(form: FormGroupDirective) {
    form.resetForm();
    form.reset();
  }
}
