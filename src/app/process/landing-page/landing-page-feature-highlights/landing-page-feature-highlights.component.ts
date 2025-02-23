import { Component } from '@angular/core';
import {
  ProfileCardsContextComponent
} from '../../../share/components/profile-cards/profile-cards-context/profile-cards-context.component';

@Component({
  selector: 'app-landing-page-feature-highlights',
  imports: [
    ProfileCardsContextComponent
  ],
  templateUrl: './landing-page-feature-highlights.component.html',
  standalone: true,
  styleUrl: './landing-page-feature-highlights.component.scss'
})
export class LandingPageFeatureHighlightsComponent {

}
