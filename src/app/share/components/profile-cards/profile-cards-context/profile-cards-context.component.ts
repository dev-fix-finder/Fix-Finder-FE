import { Component } from '@angular/core';
import {ProfileCardComponent} from '../profile-card/profile-card.component';

@Component({
  selector: 'app-profile-cards-context',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './profile-cards-context.component.html',
  standalone: true,
  styleUrl: './profile-cards-context.component.scss'
})
export class ProfileCardsContextComponent {

}
