import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {LoadingService} from '../../share/services/loading/loading.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-trades-person-verify',
  imports: [
    MatIconModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './admin-trades-person-verify.component.html',
  styleUrl: './admin-trades-person-verify.component.scss'
})
export class AdminTradesPersonVerifyComponent {
  image: string | ArrayBuffer | null = null;


  page: number | undefined = 0;
  size: number | undefined = 15;
  paginateOption: number[] = [15, 20, 50, 100];
  dataCount: number = 0;
  dataArray: any[] = [];
  // @ts-ignore
  pageEvent: PageEvent;
  file: any;

  constructor(
    public loadingService: LoadingService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    // public profileService: ProfileService,
    // public piscsManagerService: PicsManagerService,
  ) {
  }

  ngOnInit(): void {
  }

  serverDataManager(event?: PageEvent): any {
    this.page = event?.pageIndex;
    this.size = event?.pageSize;
    this.initializeImages(this.page!, this.size!);
  }

  loadProfile() {
    // if (!this.profileService.profileData) {
    //   this.profileService.getProfileData().subscribe(response => {
    //     this.profileService.profileData = response.data;
    //   });
    // }
    this.initializeImages(this.page!, this.size!);
  }

  initializeImages(page: any, size: any) {
    // this.piscsManagerService.getAllPics(page, size).subscribe(response => {
    //   this.dataArray = response.data.dataList;
    //   this.dataCount = response.data.count;
    // });

  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.file = fileInput.files?.[0];
    if (this.file) {
      if (this.isFileSizeValid(this.file)) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        const fileExtension = this.file.name.split('.').pop()?.toLowerCase();

        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          this.handleFile(this.file);

          this.uploadData();


        } else {
          this.toastr.warning("Please select a valid file with jpg, jpeg, or png extension.", 'Warning!');
        }

      } else {
        this.toastr.warning('Selected file size exceeds 5 MB.', 'Warning!');
        // Show a warning or error message to the user indicating that the file size is too large.
      }
    }
  }

  isFileSizeValid(file: File): boolean {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    return file.size <= maxSizeInBytes;
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    this.file = event.dataTransfer?.files?.[0];
    if (this.file) {
      this.handleFile(this.file);
      this.uploadData();
    }
  }

  uploadData() {
    const formData = new FormData();
    formData.append("image", this.file);
    const data = {};

    const blobOverrides = JSON.stringify(data);
    formData.append('data', blobOverrides);

    /* this.piscsManagerService.savePic(formData).subscribe(response => {
       if (response.data) {
         this.initializeImages(this.page!, this.size!);
         this.snackBarService.openSuccessSnackBar("Image has been uploaded!", 'close');
       }
     });*/
  }

  handleFile(file: File) {
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.image = reader.result;
    // };
    // reader.readAsDataURL(file);
  }


  deleteData(data: any) {
    /*  const dialogRef =this.dialog.open(ProfileDataDeleteModelComponent, {
        data:{'propertyId':data?.picId,'message':'"Are you sure you want to delete this data?"',extra:[]}
      });*/

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result) {
        /* this.piscsManagerService.deleteData(data.picId).subscribe(response => {
           if (response.data) {
             this.initializeImages(this.page!, this.size!);
             this.snackBarService.openSuccessSnackBar("Image has been Deleted!", 'close');
           }
         });*/
      }
    })
  }
}
