import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../share/services/auth/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-verify-your-email',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './verify-your-email.component.html',
  standalone: true,
  styleUrl: './verify-your-email.component.scss'
})
export class VerifyYourEmailComponent implements OnInit{
  constructor(private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  email = '';

  form = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')])
  })

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      this.email = data.get('email')!;
    })
  }

  verify() {
    if (this.email) {
      this.authService.verify(Number.parseInt(this.form.get('code')?.value!), this.email).subscribe(response => {
        if (response.code === 201) {
          this.toastr.success('Successfully Activated!.', 'Success');
          this.router.navigateByUrl('/security/login');
        }
      }, error => {
        if (error) {
          if (error === 'WRONG_OTP') {
            this.toastr.warning('Wrong Verification Code! try again.', 'Warning!');
          } else if (error === 'EMAIL_NOT_FOUND') {
            this.toastr.warning('Wrong Email, try again.', 'Warning!');
            this.router.navigateByUrl('/security/resend');
          } else if (error === 'ALREADY_ACTIVATED') {
            this.toastr.warning('Already Activated.', 'Warning!');
            this.router.navigateByUrl('/security/login');
          } else {
            this.toastr.warning('something went wrong, try again.', 'Warning!');
            this.router.navigateByUrl('/security/resend');
          }
        }
      })
    } else {
      this.toastr.error('Something went wrong, please Resend the Code', 'Error!');
      this.router.navigateByUrl('/security/resend');
    }

  }
}
