import {Component, Inject, SecurityContext} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-profile-pic-manager',
  imports: [
    MatDialogModule,
    ImageCropperComponent,
    MatButton,
    NgStyle
  ],
  templateUrl: './profile-pic-manager.component.html',
  standalone: true,
  styleUrl: './profile-pic-manager.component.scss'
})
export class ProfilePicManagerComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  // @ts-ignore
  safeUrl: SafeUrl;
  // @ts-ignore
  blobUrl: string;
  fileName: any;

  constructor(
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ProfilePicManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.fileName = data.fileName;
    this.imageChangedEvent = data.resource;
  }

  closeData() {
    this.dialogRef.close(null);
  }

  selectImage() {
    this.fetchBlobData(this.blobUrl);
  }


  imageCropped(event: ImageCroppedEvent) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    // event.blob can be used to upload the cropped image
    this.blobUrl = this.sanitizer.sanitize(SecurityContext.URL, this.safeUrl) || '';


  }

  fetchBlobData(blobUrl: string) {
    fetch(blobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        if (this.safeUrl && blob) {

          // Get the filename or set a default one
          const filename = this.fileName || Math.floor(Math.random() * (100000000 - 1000 + 1) + 1000); // Change this to your desired filename

          // Create a new File object with the blob and filename
          const file = new File([blob], filename, {type: blob.type});


          this.dialogRef.close({
            blobData: file,
            displayData: this.safeUrl
          });
        } else {
          this.toastr.warning('Please resize your image and try again!', 'Warning', {
            timeOut: 3000,
          });
        }

      })
      .catch((error) => {
        // Handle fetch error
        console.error('Error fetching blob data:', error);
      });
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }
}
