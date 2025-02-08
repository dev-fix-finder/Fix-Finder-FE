import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../share/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-resend-code-email',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatInputModule
  ],
  templateUrl: './resend-code-email.component.html',
  standalone: true,
  styleUrl: './resend-code-email.component.scss'
})
export class ResendCodeEmailComponent {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

  }

  resend() {
    this.authService.resend(this.form.get('email')?.value!).subscribe(response => {
      if (response.code === 201) {
        this.toastr.success('Successfully Activated!.', 'Success', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/security/login');
      }
    }, error => {
      if (error) {
        if (error === 'EMAIL_NOT_FOUND') {
          this.toastr.warning('Wrong Email, try again.', 'Warning', {
            timeOut: 3000,
          });
        } else if (error === 'ALREADY_ACTIVATED') {
          this.toastr.warning('Already Activated.', 'Warning', {
            timeOut: 3000,
          });
          this.router.navigateByUrl('/security/login');
        } else if (error === 'VERIFICATION_REQUIRED') {
          this.toastr.warning('Verification Required!.', 'Warning', {
            timeOut: 3000,
          });
          this.router.navigateByUrl('/security/verify/' + this.form.get('email')?.value!);
        } else {
          this.toastr.error('something went wrong, try again.', 'Warning', {
            timeOut: 3000,
          });
        }
      }
    })

  }
}
