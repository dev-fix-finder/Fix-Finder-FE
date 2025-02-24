import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';
import {CookieManagerService} from '../../../../../share/services/cookie-manager/cookie-manager.service';

@Component({
  selector: 'app-profile-slider',
  imports: [
    NgStyle
  ],
  templateUrl: './profile-slider.component.html',
  standalone: true,
  styleUrl: './profile-slider.component.scss'
})
export class ProfileSliderComponent {
  avatar = 'assets/profile-default/avatar-default.jpg';
  user: any;
  dataAvailability = false;

  constructor(
    private cookieManager: CookieManagerService,
  ) {
  }

  ngOnInit(): void {
    if (this.cookieManager.personalDataIsExists()) {
      try {
        this.user = JSON.parse(this.cookieManager.getPersonalData());
        console.log(this.user)
        this.avatar = this.user.avatar;
        this.dataAvailability = true;
      } catch (e) {
        //console.log(e)
      }
    }
  }
}
