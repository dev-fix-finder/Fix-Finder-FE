import {Component, OnInit} from '@angular/core';
import {CookieManagerService} from '../../share/services/cookie-manager/cookie-manager.service';
import {AuthService} from '../../share/services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../share/services/loading/loading.service';

@Component({
  selector: 'app-verification-pool',
  imports: [],
  templateUrl: './verification-pool.component.html',
  standalone: true,
  styleUrl: './verification-pool.component.scss'
})
export class VerificationPoolComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    console.log('request recieved')
    this.check();
  }

  private check() {
    this.loadingService.mainLoader.next(true);
    console.log(sessionStorage.getItem('token'))
    if (sessionStorage.getItem('token')) {
      this.authService.getUserData(sessionStorage.getItem('token')).subscribe(response => {
        if (response.code === 200) {
          sessionStorage.setItem('personalData', response.data);
          let tempArr: [] = response.data.role;
          let selectedUserRole = tempArr.find(e => e == 'USER');
          if (selectedUserRole) {
            let tradesPersonRole = tempArr.find(e => e == 'TRADEPERSON');
            let superAdminRole = tempArr.find(e => e == 'SUPER_ADMIN');
            if (tradesPersonRole || superAdminRole) {
              this.router.navigateByUrl('/console/playground/dashboard');
            } else {
              this.router.navigateByUrl('/process/register');
            }
          }
        }
      })
    } else {
      this.router.navigateByUrl('/security/login').then();
    }
    this.loadingService.mainLoader.next(false);
  }
}
