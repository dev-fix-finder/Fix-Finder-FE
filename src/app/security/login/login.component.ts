import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../share/services/auth/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ToastrService} from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UserStateService} from '../../share/states/user-state/user-state.service';
import {first} from "rxjs";
import {HttpResponse} from '@angular/common/http';

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
  userType: string = '';

  constructor(
    private userStateService: UserStateService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {

    this.userStateService.userType$.subscribe((userType) => {
      this.userType = userType;
    });

  }

  login() {
    const data = {
      username: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!
    }

    this.authService.login(data).pipe(first())
      .subscribe(
        (data: HttpResponse<any>) => {
          sessionStorage.setItem("token", data.headers.get('Authorization')!);
          this.toastr.success('welcome again!', 'Success', {
            timeOut: 3000,
          });
          if (this.userType === 'CLIENT') {
            this.router.navigateByUrl('/console').then()
          } else if (this.userType === 'TRADES-PERSON') {
            this.router.navigateByUrl('/console/verification').then()
          }
        },
        error => {
          this.toastr.error('username or password incorrect!', 'Warning!');
        })
  }

  forgotPassword() {
    this.router.navigateByUrl('/security/forget-password').then()
  }

}
