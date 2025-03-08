import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ToastrService} from 'ngx-toastr';
import {CookieManagerService} from '../../share/services/cookie-manager/cookie-manager.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-user-register',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './user-register.component.html',
  standalone: true,
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {

  userId: string = '';
  personalData: any = null;

  studentRegForm = new FormGroup({
    nic: new FormControl(null, [Validators.required,
      Validators.pattern('(?:19|20)?\\d{3}[0-9]{8}|[0-9]{9}[x|X|v|V]')]),
    country: new FormControl(null),
    city: new FormControl(null),
    postal: new FormControl(null),
    address: new FormControl(null),
    mobile: new FormControl(null, [Validators.required, Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')
    ]),
    home: new FormControl('', [Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')
    ]),
  });

  constructor(
    private toastr: ToastrService,
    private cookieManager: CookieManagerService,
    private router: Router
  ) {
  }

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

  studentRegistrationSubmit(f: FormGroupDirective) {
    let nic = this.studentRegForm.get('nic')?.value!;
    let country = this.studentRegForm.get('country')?.value!;
    let city = this.studentRegForm.get('city')?.value!;
    let postal = this.studentRegForm.get('postal')?.value!;
    let address = this.studentRegForm.get('address')?.value!;
    let mobile = this.studentRegForm.get('mobile')?.value!;
    let home = this.studentRegForm.get('home')?.value!;

    const data = {}
    this.router.navigateByUrl('/console/verification').then()

  }

  private resetForm(form: FormGroupDirective) {
    form.resetForm();
  }
}
