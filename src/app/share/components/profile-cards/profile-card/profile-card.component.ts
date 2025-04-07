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

  file: any;
  // @ts-ignore
  croppedImage: SafeUrl;
  // @ts-ignore
  blobData: any;
  public profileAvatar = 'assets/images/instructors/avatar.png';


  personalData: any;

  student: any = [];
  studentQualifications: any = [];

  protected readonly Date = Date;

  constructor(
    // private studentService: StudentService,
    // private snackBarService: SnackBarService,
    private loadingService: LoadingService,
    // private imageService: ImageService,
    // private dialog: MatDialog,
    // private sanitizer: DomSanitizer,
    // private cookieManager: CookieManagerService
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.personalData = JSON.parse(sessionStorage.getItem('personalData'));
    this.loadStudent();
  }

  loadStudent() {
    // this.studentService.getStudentData(this.personalData.userId).subscribe(studentData => {
    //   this.student = studentData?.data;
    //   if (this.student?.profilePic != null) {
    //     this.profileAvatar = this.student?.profilePic;
    //   }
    //   this.loadQualifications();
    // })
  }

  loadQualifications() {
    // this.studentService.getStudentQualifications(this.student?.studentId).subscribe(studentData => {
    //   this.studentQualifications = studentData?.data;
    // })
  }

  /*isFileSizeValid(file: File): boolean {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB in bytes
    return file.size <= maxSizeInBytes;
  }*/

  /*onFileSelected(event: Event) {
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
              // this.uploadAvatar();
            }
          });

        } else {
          this.snackBarService.openWarningSnackBar("Please select a valid file with jpg, jpeg, or png extension.", 'close');
        }

      } else {
        this.snackBarService.openWarningSnackBar('Selected file size exceeds 10 MB.', 'Close');
        // Show a warning or error message to the user indicating that the file size is too large.
      }
    }
  }*/

  /*uploadAvatar() {
    if (!this.blobData) {
      this.snackBarService.openSuccessSnackBar('please Select a valid profile image', 'Close');
      return;
    }
    this.loadingService.mainLoader.next(true);

    if (this.student?.profilePic != null) {
      this.imageService.deleteImage(this.profileAvatar);
    }

    this.imageService.saveFile(this.blobData, 'ipa-resource/profile-pictures').then(response => {
        if (response) {

          // const profilePictureDto = new RequestStudentProfilePictureDTO(
          //   response
          // )

          this.studentService.changeStudentProfilePicture(this.student?.studentId, profilePictureDto).subscribe(response => {
              if (response.code == 203) {
                this.loadingService.mainLoader.next(false);
                location.reload();
              }
            }, error => {
              console.log(error);
              this.loadingService.mainLoader.next(false);
              this.snackBarService.openErrorSnackBar('Something went wrong!', 'Close');
            }
          )
        }

      }
    ).catch(error => {
      this.snackBarService.openErrorSnackBar('Something went wrong!', 'Close');
      this.loadingService.mainLoader.next(false);
    })
  }*/

 /* editStudent() {
    const dialogRef = this.dialog.open(UpdateStudentBasicDataPopUpComponent, {
      data: this.student,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudent();
      }
    });

  }*/

  // editQualification() {
  //   const dialogRef = this.dialog.open(EditStudentQualificationsPopUpComponent, {
  //       width: '600px',
  //       data: {
  //         student: this.student,
  //         qualifications: this.studentQualifications
  //       }
  //     }
  //   );
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadQualifications();
  //   });
  //
  // }
}
