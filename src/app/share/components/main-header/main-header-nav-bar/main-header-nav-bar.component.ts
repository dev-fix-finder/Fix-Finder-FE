import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {UserStateService} from '../../../states/user-state/user-state.service';

@Component({
  selector: 'app-main-header-nav-bar',
  imports: [
    MatIcon,
    RouterLink,
    RouterLinkActive,
    MatButton,
    NgIf
  ],
  templateUrl: './main-header-nav-bar.component.html',
  standalone: true,
  styleUrl: './main-header-nav-bar.component.scss'
})
export class MainHeaderNavBarComponent {
  navSliderState = false;
  pageSize: any = 10;
  page: any = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userStateService:UserStateService
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
