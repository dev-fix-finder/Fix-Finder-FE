import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ToastrService} from 'ngx-toastr';
import {CookieManagerService} from '../../share/services/cookie-manager/cookie-manager.service';
import {Router} from '@angular/router';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './user-register.component.html',
  standalone: true,
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {

  professions = [
    { value: 'carpenter', viewValue: 'Carpenter' },
    { value: 'plumber', viewValue: 'Plumber' },
    { value: 'gardener', viewValue: 'Gardener' },
    { value: 'electrician', viewValue: 'Electrician' },
    { value: 'painter', viewValue: 'Painter' },
    { value: 'mason', viewValue: 'Mason' },
    { value: 'mechanic', viewValue: 'Mechanic' }
  ];

  daysOfWeek = [
    { value: 'monday', viewValue: 'Monday' },
    { value: 'tuesday', viewValue: 'Tuesday' },
    { value: 'wednesday', viewValue: 'Wednesday' },
    { value: 'thursday', viewValue: 'Thursday' },
    { value: 'friday', viewValue: 'Friday' },
    { value: 'saturday', viewValue: 'Saturday' },
    { value: 'sunday', viewValue: 'Sunday' }
  ];

  personalInfoForm = new FormGroup({
    nic: new FormControl('', [Validators.required]),
    gender: new FormControl(null),
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')])
  });

  professionalInfoForm = new FormGroup({
    profession: new FormControl('', [Validators.required]),
    experience: new FormControl(null, [Validators.required]),
    hourlyRate: new FormControl('', [Validators.required]),
    availableDays: new FormControl([], [Validators.required])
  });

  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {

    /*if (this.cookieManager.personalDataIsExists()) {
      this.personalData = JSON.parse(this.cookieManager.getPersonalData())
      if (this.personalData === null) {
        this.toastr.warning('Please login again!', 'Warning', {
          timeOut: 3000,
        });
        this.cookieManager.logout();
        this.router.navigateByUrl('/security/login').then();
      } else {
        // @ts-ignore
        this.userId = this.personalData?.property_id
        console.log(this.personalData);
        let roles = this.personalData?.role;
        let studentRole = 'STUDENT'
        for (let role of roles) {
          if (role === studentRole) {
            this.router.navigateByUrl('/console/playground/home');
            return;
          }
        }
      }
    } else {
      this.router.navigateByUrl('/console/verification');
    }*/
  }
  // tradesPersonRegistrationSubmit(fPersonal: FormGroupDirective, fProfessional: FormGroupDirective) {
  //   if (this.personalInfoForm.valid && this.professionalInfoForm.valid) {
  //     this.toastr.success('Registration Successful', 'Success');
  //     this.router.navigateByUrl('/console/verification');
  //   } else {
  //     this.toastr.error('Please fill in all required fields.', 'Error');
  //   }
  // }
  tradesPersonRegistrationSubmit(fPersonal: FormGroupDirective, fProfessional: FormGroupDirective) {
    let nic = this.personalInfoForm.get('nic')?.value!;
    let country = this.personalInfoForm.get('country')?.value!;
    let city = this.personalInfoForm.get('city')?.value!;
    let postal = this.personalInfoForm.get('postal')?.value!;
    let address = this.personalInfoForm.get('address')?.value!;
    let mobile = this.personalInfoForm.get('mobile')?.value!;
    let home = this.personalInfoForm.get('home')?.value!;

    const data = {}
    this.router.navigateByUrl('/console/verification').then()

  }

  private resetForm(form: FormGroupDirective) {
    form.resetForm();
  }
}
