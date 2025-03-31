import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CookieManagerService } from '../../../../../share/services/cookie-manager/cookie-manager.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-profile-user-details',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './profile-user-details.component.html',
  styleUrl: './profile-user-details.component.scss'
})
export class ProfileUserDetailsComponent {
  userData: any = {};
  data: any = {};

  readonly reactiveKeywords = signal<string[]>([]);
  readonly skillFormControl = new FormControl<string[]>([]);

  announcer = inject(LiveAnnouncer);

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      return keywords.filter(k => k !== keyword);
    });
    this.announcer.announce(`Removed ${keyword} from reactive form`);
  }

  addReactiveKeyword(event: any): void {
    const value = (event.value || '').trim();

    if (value && !this.reactiveKeywords().includes(value)) {
      this.reactiveKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`Added ${value} to reactive form`);
    }

    event.chipInput!.clear();
  }

  trackByKeyword(index: number, keyword: string): string {
    return keyword;
  }

  constructor(
    private cookieManager: CookieManagerService,
    private router: Router,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.cookieManager.personalDataIsExists()) {
      this.userData = JSON.parse(this.cookieManager.getPersonalData());
    }
  }
}
