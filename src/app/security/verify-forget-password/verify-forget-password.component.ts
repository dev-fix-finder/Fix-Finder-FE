import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../share/services/auth/auth.service';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-verify-forget-password',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './verify-forget-password.component.html',
  standalone: true,
  styleUrl: './verify-forget-password.component.scss'
})
export class VerifyForgetPasswordComponent {
  constructor(private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  passwordState = true;
  resetState = false;
  email = '';
  code: number = 0;

  form = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')])
  });

  resetForm = new FormGroup({
    password: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
    rePassword: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      this.email = data.get('email')!;
    })
  }

  verify() {
    if (this.email) {
      this.authService.verifyReset(Number.parseInt(this.form.get('code')?.value!), this.email).subscribe(response => {
        if (response.code === 200) {
          this.code = Number.parseInt(this.form.get('code')?.value!);
          this.resetState = true;
        }
      }, error => {
        if (error) {
          if (error === 'WRONG_OTP') {
            this.toastr.warning('Wrong Verification Code! try again.', 'Warning!');
          } else if (error === 'EMAIL_NOT_FOUND') {
            this.toastr.warning('Wrong Email, try again.', 'Warning!');
            this.router.navigateByUrl('/security/forgot-password');
          } else {
            this.toastr.error('something went wrong, try again.', 'Error!');
          }
        }
      })
    } else {
      this.toastr.error('Something went wrong, please Resend the Code', 'Warning!');
      this.router.navigateByUrl('/security/forgot-password');
    }

  }

  resetPassword() {
    if (this.resetForm.get('password')?.value?.trim()!.length === 0) {
      this.toastr.warning('Please insert a valid password!', 'Warning!');
      return;
    }
    if (this.resetForm.get('rePassword')?.value?.trim()!.length === 0) {
      this.toastr.warning('Please insert a valid password!', 'Warning!');
      return;
    }

    if (this.resetForm.get('password')?.value?.trim() === this.resetForm.get('rePassword')?.value?.trim()) {


      if (this.email) {
        this.authService.resetPassword(this.code, this.email, this.resetForm.get('password')?.value?.trim()!).subscribe(response => {
          if (response.code === 201) {
            this.toastr.success('Password was modified.', 'Success');
            this.router.navigateByUrl('/security/login')
          }
        }, error => {
          if (error) {
            if (error === 'WRONG_OTP') {
              this.toastr.warning('Wrong Verification Code! try again.', 'Warning!');
            } else if (error === 'EMAIL_NOT_FOUND') {
              this.toastr.warning('Wrong Email, try again.', 'Warning!');
              this.router.navigateByUrl('/security/forgot-password');
            } else if (error === 'VERIFICATION_REQUIRED') {
              this.toastr.warning('VERIFICATION_REQUIRED', 'Warning!');
              this.router.navigateByUrl('/security/resend');
            } else {
              this.toastr.error('something went wrong, try again.', 'Error!');
            }
          }
        })
      } else {
        this.toastr.error('Something went wrong, please Resend the Code', 'Error!');
        this.router.navigateByUrl('/security/forgot-password');
      }


    } else {
      this.toastr.warning('both password should match?!', 'Warning!');
      return;
    }

  }
}
