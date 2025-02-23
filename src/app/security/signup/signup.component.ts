import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CookieManagerService} from '../../share/services/cookie-manager/cookie-manager.service';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../share/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckbox
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  userForm = new FormGroup({
    isTradesPerson: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
    name: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
    email: new FormControl('',
      [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
    confirmPassword: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
  });
  
  passwordState: boolean = false;

  constructor(
    private cookieManager: CookieManagerService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  signup() {

    if (this.userForm.get('email')?.value?.trim()!.length === 0) {
      this.toastr.warning('Please insert a valid email!', 'Warning', {
        timeOut: 3000,
      });
      return;
    }
    if (this.userForm.get('password')?.value?.trim()!.length === 0) {
      this.toastr.warning('Please insert a valid password!', 'Warning', {
        timeOut: 3000,
      });
      return;
    }

    const data = {
      //signup request payload
    }

    this.authService.signup(data).subscribe(response => {
      if (response.code === 201) {
        this.toastr.success('VERIFICATION_REQUIRED', 'Success', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/security/verify/' + this.userForm.get('email')?.value!);
      } else {
        alert('something went wrong, please try again!');
      }
    }, error => {
      if (error === 'VERIFICATION_REQUIRED') {
        this.toastr.success('VERIFICATION_REQUIRED', 'Success', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/security/verify/' + this.userForm.get('email')?.value!);
      } else if (error === 'ALREADY_EXISTS') {
        this.toastr.warning('ALREADY_EXISTS Please login', 'Warning', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/security/login');
      } else {
        this.toastr.warning('Something went wrong, please ty again.', 'Warning', {
          timeOut: 3000,
        });
      }
    });
  }

  ngOnInit(): void {
    /*  if (this.cookieManager.tokenIsExists('token')) {
        this.router.navigateByUrl('/console')
      }*/
  }
}
