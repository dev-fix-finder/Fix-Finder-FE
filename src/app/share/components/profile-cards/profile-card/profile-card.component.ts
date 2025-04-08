import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingService} from '../../../services/loading/loading.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './profile-card.component.html',
  standalone: true,
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  selectedTab = 'Basic';

  packages = {
    Basic: {
      price: 15,
      description: 'Bronze-TEXT DESIGN ONLY TEXT LOGO only. No cartoon mascot or illustration.',
      delivery: 4,
      revisions: 'Unlimited Revisions',
      features: ['1 concept included', 'Logo transparency', 'Vector file', 'Printable file']
    },
    Standard: {
      price: 40,
      description: 'Mascot + text, 2 concepts',
      delivery: 3,
      revisions: 'Unlimited Revisions',
      features: ['2 concepts', 'Full body character', 'Vector + Source file']
    },
    Premium: {
      price: 70,
      description: 'Full custom mascot character logo',
      delivery: 2,
      revisions: 'Unlimited Revisions',
      features: ['Multiple poses', 'Source files', 'Full copyright', 'Priority support']
    }
  };

  get package() {
    // @ts-ignore
    return this.packages[this.selectedTab];
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
