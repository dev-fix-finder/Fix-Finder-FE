import {Component} from '@angular/core';
import {ProfileSliderComponent} from './inner-items/profile-slider/profile-slider.component';
import {ProfileUserDetailsComponent} from './inner-items/profile-user-details/profile-user-details.component';

@Component({
  selector: 'app-profile-context',
  imports: [
    ProfileSliderComponent,
    ProfileUserDetailsComponent
  ],
  templateUrl: './profile-context.component.html',
  standalone: true,
  styleUrl: './profile-context.component.scss'
})
export class ProfileContextComponent {

}
