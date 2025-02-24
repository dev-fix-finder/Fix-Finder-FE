import {Component, computed, inject, model, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {CookieManagerService} from '../../../../../share/services/cookie-manager/cookie-manager.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-profile-user-details',
  imports: [
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './profile-user-details.component.html',
  standalone: true,
  styleUrl: './profile-user-details.component.scss'
})
export class ProfileUserDetailsComponent {

  userData: any;
  data: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentSkill = model('');
  readonly skills = signal(['Electrician']);
  readonly allSkills: string[] = ['Electrician', 'Carpenter', 'Painter', 'Welder', 'Mechanic', 'Bricklayer', 'Roofer', 'Landscaper', 'HVAC Technician', 'Tiler'];

  readonly filteredSkills = computed(() => {
    const currentFruit = this.currentSkill().toLowerCase();
    return currentFruit
      ? this.allSkills.filter(fruit => fruit.toLowerCase().includes(currentFruit))
      : this.allSkills.slice();
  });
  readonly announcer = inject(LiveAnnouncer);

  /* editUserDetails() {
     const popup = this.matDialog.open(EditStudentProfileUserDataComponent, {
       width: '600px',
       data: {
         id: this.studentData.property_id,
         dataList: this.studentData
       }
     });
     popup.afterClosed().subscribe(data => {
       console.log(data)
       if (data) {
         this.cookieManager.logout();
         this.router.navigateByUrl('/security/login').then();
       }
     })
   }

   editStudentDetails() {
     const popup = this.matDialog.open(EditStudentProfileStudentNicComponent , {
       width: '600px',
       data: {
         id: this.data.studentId,
         dataList: this.data
       }
     });
     popup.afterClosed().subscribe(data => {
       this.cookieManager.logout();
       this.router.navigateByUrl('/security/login')
     })
   }*/

  constructor(
    private cookieManager: CookieManagerService,
    private router: Router,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    /* if (this.cookieManager.studentIdIsExists()
     ) {*/

    if (this.cookieManager.personalDataIsExists()) {
      this.userData = JSON.parse(this.cookieManager.getPersonalData());
      console.log(this.userData)
    }

    /* try {
       this.loadStudentData(this.cookieManager.getStudentId());
     } catch (e) {
     }*/
    // }

  }

  loadStudentData(studentId: string) {
    /* this.studentService.getStudentDetails(studentId).subscribe(response => {
       console.log(response)
       if (response.code === 200) {
         this.data = response.data
       }
     })*/
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.update(fruits => [...fruits, value]);
    }

    // Clear the input value
    this.currentSkill.set('');
  }

  remove(skill: string): void {
    this.skills.update(fruits => {
      const index = fruits.indexOf(skill);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${skill}`);
      return [...fruits];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.update(fruits => [...fruits, event.option.viewValue]);
    this.currentSkill.set('');
    event.option.deselect();
  }


  loadFavBooksForEdit() {
    // if (this.skills) {
    // const dialogRef = this.dialog.open(FavBooksManagerDialogComponent, {
    //   data: {'id': this.profileService.profileData?.responseProfile.profileId},
    //   width: '800px'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
        // this.profileService.profileData = null;
        // this.loadProfile();
    //   }
    // });
    // }
  }

  deleteBookData(tempBooks: any) {

  }
}
