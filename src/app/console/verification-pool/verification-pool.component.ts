import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../share/services/loading/loading.service';
import {User, UserStateService} from '../../share/states/user-state/user-state.service';

@Component({
  selector: 'app-verification-pool',
  imports: [],
  templateUrl: './verification-pool.component.html',
  standalone: true,
  styleUrl: './verification-pool.component.scss'
})
export class VerificationPoolComponent implements OnInit {

  userType: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private userStateService: UserStateService
  ) {
  }

  ngOnInit(): void {
    this.check();

    this.userStateService.userType$.subscribe(userType => {
      this.userType = userType;
    })
  }

  private check() {
    this.loadingService.mainLoader.next(true);
    console.log(sessionStorage.getItem('token'));
    if (sessionStorage.getItem('token')) {
      this.authService.getUserData(sessionStorage.getItem('token')).subscribe(response => {
        if (response.code === 200) {
          sessionStorage.setItem('personalData', JSON.stringify(response.data));
          // Set current user in UserStateService
          const userData: User = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email
          };
          this.userStateService.setCurrentUser(userData);

          let tempArr: [] = response.data.role;
          let selectedUserRole = tempArr.find(e => e == 'USER');
          let tradesPersonRole = tempArr.find(e => e == 'TRADEPERSON');
          let superAdminRole = tempArr.find(e => e == 'SUPER_ADMIN');

          if (superAdminRole) {
            this.userStateService.setUserType('SUPER_ADMIN');
            this.router.navigateByUrl('/console/playground/dashboard');
          } else if (selectedUserRole) {
            if (tradesPersonRole && this.userType === 'TRADES-PERSON') {
              this.router.navigateByUrl('/console/playground/dashboard');
            } else if (this.userType === 'TRADES-PERSON') {
              this.router.navigateByUrl('/process/register');
            } else {
              this.router.navigateByUrl('/console/playground/dashboard');
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
