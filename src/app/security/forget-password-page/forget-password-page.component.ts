import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../share/services/auth/auth.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-forget-password-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './forget-password-page.component.html',
  standalone:true,
  styleUrl: './forget-password-page.component.scss'
})
export class ForgetPasswordPageComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
  }


  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  ngOnInit(): void {
  }

  forgetPasswordSendVerification() {
    this.authService.forgotPasswordSendVerificationCode(this.form.get('email')?.value!).subscribe(response => {
      if (response.code===201){
        this.toastr.success('Please verify your email!.', 'Success');
        this.router.navigateByUrl('/security/verify-password-reset/'+this.form.get('email')?.value!);
      }
    }, error => {
      if (error) {
        if (error === 'EMAIL_NOT_FOUND') {
          this.toastr.warning('Wrong Email, try again.', 'Warning!');
        } else if (error === 'VERIFICATION_REQUIRED') {
          this.toastr.warning('Verification Required!.', 'Warning');
          this.router.navigateByUrl('/security/verify/'+this.form.get('email')?.value!);
        }else{
          this.toastr.error('something went wrong, try again.', 'Error!');
        }
      }
    })

  }
}
