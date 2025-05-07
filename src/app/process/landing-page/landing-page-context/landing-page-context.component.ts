import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserStateService} from '../../../share/states/user-state/user-state.service';

@Component({
  selector: 'app-landing-page-context',
  imports: [],
  templateUrl: './landing-page-context.component.html',
  standalone: true,
  styleUrl: './landing-page-context.component.scss'
})
export class LandingPageContextComponent {
  navSliderState = false;
  pageSize: any = 10;
  page: any = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userStateService: UserStateService
  ) {
  }

  manageNavBar() {
    console.log('fired');
    this.navSliderState = !this.navSliderState;
  }


  routeToSignIn(userType: string) {
    this.userStateService.setUserType(userType);
    this.router.navigateByUrl('/security/login').then()
  }
}
