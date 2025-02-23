import { Component } from '@angular/core';
import {
  LandingPageFeatureHighlightsComponent
} from '../landing-page-feature-highlights/landing-page-feature-highlights.component';
import {
  LandingPagePopularServicesComponent
} from '../landing-page-popular-services/landing-page-popular-services.component';

@Component({
  selector: 'app-landing-page-context',
  imports: [
    LandingPageFeatureHighlightsComponent,
    LandingPagePopularServicesComponent
  ],
  templateUrl: './landing-page-context.component.html',
  standalone: true,
  styleUrl: './landing-page-context.component.scss'
})
export class LandingPageContextComponent {

}
