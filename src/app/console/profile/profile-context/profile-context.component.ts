import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {TradespersonService} from '../../../share/services/tradesperson/tradesperson.service';
import {CategoryService} from '../../../share/services/category/category.service';
import {JobListingService} from '../../../share/services/job-listing/job-listing.service';
import {UserService} from '../../../share/services/user/user.service';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {FormValidation} from '../../../share/form-validations/form-validation';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {UserStateService} from '../../../share/states/user-state/user-state.service';

// Custom interface to replace NgxDropzoneChangeEvent
interface FileChangeEvent {
  addedFiles: File[];
  rejectedFiles?: File[];
}

@Component({
  selector: 'app-profile-context',
  imports: [
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './profile-context.component.html',
  standalone: true,
  styleUrl: './profile-context.component.scss'
})
export class ProfileContextComponent implements OnInit {

  readonly pricingFeatureList: WritableSignal<any> = signal([]);

  readonly pricingFeaturesFormControl = new FormControl(['angular']);

  userType: any;
  userData: any;
  profileAvatar: any = 'assets/profile-default/avatar-default.jpg';
  tradesPersonData: any;

  categories: any[] = [];
  references: any[] = [];
  uploadedImages: string[] = [];
  selectedFile: string | null = null;
  editingReferenceIndex: number = -1;

  // Toggle state for personal information form
  isEditMode: boolean = false;

  personalInfoForm = new FormGroup({
    userId: new FormControl({value: '', disabled: true}),
    name: new FormControl('', [Validators.required]),
    nic: new FormControl(null, [Validators.required, FormValidation.nic]),
    gender: new FormControl(null),
    dob: new FormControl(null, [Validators.required, FormValidation.date]),
    email: new FormControl({value: '', disabled: true}, [Validators.email, FormValidation.email]),
    mobile: new FormControl('', [Validators.required, FormValidation.mobileNumber]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('')
  });

  professionalInfoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    pricePerHour: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    pricingDescription: new FormControl(''),
  });

  verificationForm = new FormGroup({
    referenceName: new FormControl('', [Validators.required]),
    referenceMobile: new FormControl('', [Validators.required, FormValidation.mobileNumber])
  });

  myListings: any[] = [];

  //pricing features
  announcer = inject(LiveAnnouncer);

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private tradespersonService: TradespersonService,
    private categoryService: CategoryService,
    private userStateService: UserStateService,
    private jobListingService: JobListingService,
    private userService: UserService,
  ) {
  }

  updateUserData() {
    if (this.personalInfoForm.valid) {
      const formValues = this.personalInfoForm.value;

      const userData = {
        tradePersonName: formValues.name || '',
        nic: formValues.nic || '',
        mobile: formValues.mobile || '',
        address: formValues.address || '',
        gender: formValues.gender || '',
        email: formValues.email || '',
        dob: formValues.dob ? this.formatDate(formValues.dob) : '',
        country: formValues.country || '',
        city: formValues.city || '',
        isVerified: true,
        longitude: 0,
        latitude: 0,
        distance: 0,
      };

      console.log(userData);
      this.tradespersonService.updateTradePerson(userData, this.tradesPersonData?.tradePersonId).subscribe(response => {
        if (response.code === 203) {
          this.toastr.success(response.message, 'Success!');
          this.tradesPersonData = response.data;
          this.setValuesToForm();
          this.toastr.success(response.message, 'Success!');
        } else {
          this.toastr.error(response.message, 'Error!');
        }
      })
    } else {
      this.toastr.error('Please fill all required fields', 'Error!');
    }

  }

  ngOnInit(): void {
    // @ts-ignore
    this.userData = JSON.parse(sessionStorage.getItem('personalData'));

    this.userStateService.userType$.subscribe(userType => {
      this.userType = userType;
    })
    this.loadUserProfilePictureByUserId();
    this.loadTradesPersonByUserId();
    this.loadAllCategories();

    // Disable form fields initially
    this.disableFormFields();
  }

  // Toggle edit mode for personal information form
  toggleEditMode(event: any): void {
    this.isEditMode = event.checked;

    if (this.isEditMode) {
      this.enableFormFields();
    } else {
      this.disableFormFields();
    }
  }

  // Enable form fields except userId and email
  enableFormFields(): void {
    this.personalInfoForm.get('name')?.enable();
    this.personalInfoForm.get('nic')?.enable();
    this.personalInfoForm.get('gender')?.enable();
    this.personalInfoForm.get('dob')?.enable();
    this.personalInfoForm.get('mobile')?.enable();
    this.personalInfoForm.get('country')?.enable();
    this.personalInfoForm.get('city')?.enable();
    this.personalInfoForm.get('address')?.enable();
  }

  // Disable all form fields
  disableFormFields(): void {
    Object.keys(this.personalInfoForm.controls).forEach(key => {
      if (key !== 'userId' && key !== 'email') {
        this.personalInfoForm.get(key)?.disable();
      }
    });
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      if (response.code === 200) {
        this.categories = response.data;
        console.log(this.categories)
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
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

  loadTradesPersonByUserId() {
    this.tradespersonService.getTradesPersonByUserId(this.userData?.userId).subscribe(response => {
      if (response.code === 200) {
        this.tradesPersonData = response.data;
        this.setValuesToForm();
        this.loadListingsByTradesPersonId();
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  setValuesToForm() {
    this.personalInfoForm.patchValue({
      userId: this.userData?.userId,
      name: this.tradesPersonData?.tradePersonName,
      nic: this.tradesPersonData?.nic,
      gender: this.tradesPersonData?.gender,
      dob: this.tradesPersonData?.dob,
      email: this.userData?.email,
      mobile: this.tradesPersonData?.mobile,
      country: this.tradesPersonData?.country,
      city: this.tradesPersonData?.city,
      address: this.tradesPersonData.address,
    });
  }

  loadListingsByTradesPersonId() {
    this.jobListingService.getJobListingsByTradePersonId(this.tradesPersonData?.tradePersonId).subscribe(response => {
      if (response.code === 200) {
        this.myListings = response.data;
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  createJobListing() {
    let data = {
      title: this.professionalInfoForm.get("title")?.value,
      pricePerHour: this.professionalInfoForm.get("pricePerHour")?.value,
      categoryId: this.professionalInfoForm.get("categoryId")?.value,
      description: this.professionalInfoForm.get("description")?.value,
      skills: this.pricingFeatureList(),
    }
    this.jobListingService.createJobListing(data, this.userData.userId,this.selectedFile).subscribe(response => {
      if (response.code === 200) {
        this.toastr.success(response.message, 'Success!');
        this.professionalInfoForm.reset();
      } else {
        this.toastr.error(response.message, 'Error!');
      }
    })
  }

  editListing(listing: any): void {
    // Add your logic to open edit dialog or navigate
    console.log('Edit listing:', listing);
  }

  deleteListing(id: number): void {
    // Add your delete logic here
    console.log('Delete listing with ID:', id);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0).map((_, i) => i + 1);
  }

  // helper function
  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-'); // e.g., "2025-04-26"
  }

  onFileChange(event: FileChangeEvent) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      const file = event.addedFiles[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Store the file data URL in the selectedFile property
        this.selectedFile = e.target.result;
        console.log('File uploaded:', file.name);
      };

      reader.readAsDataURL(file);
    }
  }

  removeSelectedFile() {
    this.selectedFile = null;
  }

  addFeature(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.pricingFeatureList.update(feature => [...feature, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeFeature(keyword: string) {
    this.pricingFeatureList.update(feature => {
      const index = feature.indexOf(keyword);
      if (index < 0) {
        return feature;
      }

      feature.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      return [...feature];
    });
  }

  // Reference methods
  addReference() {
    if (this.verificationForm.valid) {
      const name = this.verificationForm.get('referenceName')?.value;
      const mobile = this.verificationForm.get('referenceMobile')?.value;

      if (this.editingReferenceIndex >= 0) {
        // Update existing reference
        this.references[this.editingReferenceIndex] = {name, mobile};
        this.editingReferenceIndex = -1;
      } else {
        // Add new reference
        this.references.push({name, mobile});
      }

      // Reset form
      this.verificationForm.reset();
      this.toastr.success('Reference added successfully', 'Success!');
    } else {
      this.toastr.error('Please fill all required fields correctly', 'Error!');
    }
  }

  editReference(index: number) {
    const reference = this.references[index];
    this.verificationForm.patchValue({
      referenceName: reference.name,
      referenceMobile: reference.mobile
    });
    this.editingReferenceIndex = index;
  }

  removeReference(index: number) {
    this.references.splice(index, 1);
    this.toastr.success('Reference removed successfully', 'Success!');
  }

  // Custom file upload methods
  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.classList.contains('custom-dropzone')) {
      target.classList.add('dragover');
    }
  }

  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.classList.contains('custom-dropzone')) {
      target.classList.remove('dragover');
    }
  }

  handleDrop(event: DragEvent, multiple: boolean = false): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.classList.contains('custom-dropzone')) {
      target.classList.remove('dragover');
    }

    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files);
      const validFiles = this.validateFiles(files, multiple);

      if (multiple) {
        this.onVerificationImageChange({addedFiles: validFiles});
      } else {
        this.onFileChange({addedFiles: validFiles});
      }
    }
  }

  handleFileInput(event: Event, multiple: boolean = false): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      const validFiles = this.validateFiles(files, multiple);

      if (multiple) {
        this.onVerificationImageChange({addedFiles: validFiles});
      } else {
        this.onFileChange({addedFiles: validFiles});
      }
    }
  }

  validateFiles(files: File[], multiple: boolean): File[] {
    // Filter files by type and size
    const maxFileSize = 2000000; // 2MB
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    const validFiles = files.filter(file => {
      const validType = acceptedTypes.includes(file.type);
      const validSize = file.size <= maxFileSize;

      if (!validType) {
        this.toastr.error(`File type not supported: ${file.name}`, 'Error!');
      }

      if (!validSize) {
        this.toastr.error(`File too large: ${file.name}`, 'Error!');
      }

      return validType && validSize;
    });

    // If not multiple, only return the first file
    return multiple ? validFiles : validFiles.slice(0, 1);
  }

  // Image methods
  onVerificationImageChange(event: FileChangeEvent) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      for (const file of event.addedFiles) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.uploadedImages.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.uploadedImages.splice(index, 1);
    this.toastr.success('Image removed successfully', 'Success!');
  }

  // Verification submission
  submitVerification() {
    if (this.references.length === 0) {
      this.toastr.error('Please add at least one reference', 'Error!');
      return;
    }

    if (this.uploadedImages.length === 0) {
      this.toastr.error('Please upload at least one verification image', 'Error!');
      return;
    }

    const verificationData = {
      tradePersonId: this.tradesPersonData?.tradePersonId,
      references: this.references,
      verificationImages: this.uploadedImages
    };

    this.tradespersonService.submitVerification(verificationData).subscribe(
      response => {
        if (response.code === 200 || response.code === 201) {
          this.toastr.success(response.message, 'Success!');
          // Reset form and data
          this.references = [];
          this.uploadedImages = [];
          this.verificationForm.reset();
        } else {
          this.toastr.error(response.message, 'Error!');
        }
      },
      error => {
        this.toastr.error('Failed to submit verification. Please try again later.', 'Error!');
        console.error('Verification submission error:', error);
      }
    );
  }
}
