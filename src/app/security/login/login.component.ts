import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../share/services/auth/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ToastrService} from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  passwordState: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  login() {
    this.toastr.success('Successfully login', 'Success', {
      timeOut: 3000,
    });

    this.router.navigateByUrl('/console').then()
    /*const data = {
      userName: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!
    }

    this.authService.login(data).pipe(first())
      .subscribe(
        data => {
          if (data?.code === 200) {
            // sessionStorage.setItem("userFullName", data?.data?.userFullName);
            // sessionStorage.setItem("userEmail", data?.data?.userEmail);
            // sessionStorage.setItem("userMobile", data?.data?.userMobile);
            // this.snackBarService.openSuccessSnackBar('Successfully login', 'close')
          } else {
            // this.snackBarService.openErrorSnackBar('Authentication Failed', 'close')
            this.loginForm.reset();
          }
          if (sessionStorage.getItem('userFullName') && sessionStorage.getItem('userEmail') && sessionStorage.getItem('userMobile')) {
            this.router.navigateByUrl('/process').then()
          }

        }, error => {
          // this.snackBarService.openErrorSnackBar('An error has occurred, please try again later', 'close')
        });*/
  }

  forgotPassword() {
    this.router.navigateByUrl('/security/forget-password').then()
  }

}
