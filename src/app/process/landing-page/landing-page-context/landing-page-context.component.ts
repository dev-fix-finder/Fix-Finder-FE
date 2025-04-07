import { Component } from '@angular/core';
import {
  LandingPageFeatureHighlightsComponent
} from '../landing-page-feature-highlights/landing-page-feature-highlights.component';
import {
  LandingPagePopularServicesComponent
} from '../landing-page-popular-services/landing-page-popular-services.component';
import {MainHeaderComponent} from '../../../share/components/main-header/main-header.component';
import {LandingPageMainSliderComponent} from '../landing-page-main-slider/landing-page-main-slider.component';

@Component({
  selector: 'app-landing-page-context',
  imports: [
    // LandingPageFeatureHighlightsComponent,
    // LandingPagePopularServicesComponent,
    // MainHeaderComponent,
    // LandingPageMainSliderComponent
  ],
  templateUrl: './landing-page-context.component.html',
  standalone: true,
  styleUrl: './landing-page-context.component.scss'
})
export class LandingPageContextComponent {

}
