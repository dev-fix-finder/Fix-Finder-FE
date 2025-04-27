import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {NgIf, NgStyle} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {CookieManagerService} from '../../share/services/cookie-manager/cookie-manager.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {
  ProfilePicManagerComponent
} from '../../share/components/image-manager/profile-pic-manager/profile-pic-manager.component';
import {LoadingService} from '../../share/services/loading/loading.service';
import {UserService} from '../../share/services/user/user.service';

@Component({
  selector: 'app-playground',
  imports: [
    RouterOutlet,
    MatIconModule,
    NgStyle,
    MatTooltipModule,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './playground.component.html',
  standalone: true,
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent implements OnInit {

  selectedData: any;
  userData: any;
  expanded = false;
  file: any;
  // @ts-ignore
  croppedImage: SafeUrl;
  // @ts-ignore
  blobData: any;
  public profileAvatar = 'assets/profile-default/avatar-default.jpg';

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cookieManager: CookieManagerService,
    private userService: UserService,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userData = JSON.parse(sessionStorage.getItem('personalData'));
    this.loadUserProfilePictureByUserId();
  }

  loadUserProfilePictureByUserId() {
    this.userService.getProfilePicture(this.userData?.userId).subscribe(response => {
      if (response.code === 200) {
        this.profileAvatar = response.data;
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  onMouseEnter() {
    this.expanded = true;
  }

  onMouseLeave() {
    this.expanded = false;
  }

  triggerNav() {
    this.expanded = !this.expanded;
  }

  isFileSizeValid(file: File): boolean {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB in bytes
    return file.size <= maxSizeInBytes;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.file = fileInput.files?.[0];
    if (this.file) {
      if (this.isFileSizeValid(this.file)) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        const fileExtension = this.file.name.split('.').pop()?.toLowerCase();

        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          const dialogRef = this.dialog.open(ProfilePicManagerComponent, {
            maxWidth: '500px',
            disableClose: true,
            data: {'resource': event, 'fileName': this.file.name}
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(result.displayData?.changingThisBreaksApplicationSecurity);
              this.blobData = result.blobData;
              this.uploadAvatar();
            }
          });

        } else {
          this.toastr.warning('Please select a valid file with jpg, jpeg, or png extension.', 'Warning', {
            timeOut: 3000,
          });
        }

      } else {
        this.toastr.warning('Selected file size exceeds 10 MB.', 'Warning', {
          timeOut: 3000,
        });
      }
    }
  }

  uploadAvatar() {
    if (!this.blobData) {
      this.toastr.warning('please Select a valid profile image', 'Warning');
      return;
    }

    this.userService.updateProfilePicture(this.blobData, this.userData?.userId).subscribe(response => {
      if (response.code == 203) {
        this.loadingService.mainLoader.next(false);
        this.profileAvatar = response.data;
        this.toastr.success('Profile picture has been updated successfully', 'Success');
      }
    })
  }
}
