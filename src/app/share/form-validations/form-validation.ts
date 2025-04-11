import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidation {
  static dateRangeValidator(arg0: string, arg1: string): ValidatorFn | ValidatorFn[] | null {
    throw new Error('Method not implemented.');
  }

  static common(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  static dropDown(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requireDropdown: true };
    }
    return null;
  }

  static nic(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requireNic: true };
    }

    const isOldFormat = value.length === 10 && /^[0-9]{9}[xvXV]$/.test(value);
    const isNewFormat = value.length === 12 && /^[0-9]{12}$/.test(value);

    if (isOldFormat || isNewFormat) {
      return null; // NIC is valid
    } else {
      return { invalidNIC: true }; // NIC is invalid
    }

  }

  static searchNIC(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(!value){
      return null;
    }

    const isNotEntered = value.length === 0;
    const isOldFormat = value.length === 10 && /^[0-9]{9}[xvXV]$/.test(value);
    const isNewFormat = value.length === 12 && /^[0-9]{12}$/.test(value);

    if (isOldFormat || isNewFormat || isNotEntered) {
      return null; // NIC is valid
    } else {
      return { invalidNIC: true }; // NIC is invalid
    }
  }

  static passport(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requirePassport: true };
    }
    return null;
  }

  static nameValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requireName: true };
    }
    return null;
  }

  static date(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requireDate: true };
    }
    return null;
  }

  dateRangeValidator(startDateControlName: string, endDateControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = control.get(startDateControlName)?.value;
      const endDate = control.get(endDateControlName)?.value;

      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const differenceInDays = Math.floor((endDateObj.getTime() - startDateObj.getTime()) / millisecondsInDay);

        if (differenceInDays > 365) {
          return { 'dateRangeExceeded': true };
        }
      }

      return null;
    };
  }

  static number(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requireNumber: true };
    }
    return null;
  }

  static text(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requireText: true };
    }
    return null;
  }

  static mobileNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const pattern = /^7[0-9]{8}$/;
    if (!pattern.test(value)) {
      return { invalidMobilePattern: true };
    }
    return null;
  }

  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const pattern = /^[1-9][0-9]{8}$/;
    if (!pattern.test(value)) {
      return { invalidPhonePattern: true };
    }
    return null;
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === '' || !value) {
      return null;
    }
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!pattern.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  static citySelectedValidator(control: FormControl): { [key: string]: any } | null {
    const city = control.value
    if (city === '') {
      return null;
    }
    if (!city || !city.city) {
      return { 'cityNotSelected': true };
    }
    return null;
  }

  static partnerCodeSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const partner = control.value;

    if (partner === null || Object.keys(partner).length === 0) {
      return null;
    }
    if (!partner || !partner.acsSCode) {
      return { 'partnerCodeNotSelected': true };
    }
    return null;
  }

  static blackListCountryValidation(control: FormControl): { [key: string]: any } | null {
    const country = control.value;
    if (country && country.blacklisted === true) {
      return { 'blackListed': true };
    }
    return null;
  }

  static agentCodeSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const agentCode = control.value;
    if (agentCode === '') {
      return null;
    }

    if (!agentCode || !agentCode.agentCode) {
      return { 'agentCodeNotSelected': true };
    }
    return null;
  }

  static aboluteOwnerSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const absoluteOwner = control.value;
    if (absoluteOwner === null || Object.keys(absoluteOwner).length === 0) {
      return null;
    }
    if (!absoluteOwner || !absoluteOwner.acsSCode) {
      return { 'aboluteOwnerNotSelected': true };
    }
    return null;
  }

  static citizenshipSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const citizenship = control.value;
    if (citizenship === '') {
      return null;
    }
    if (!citizenship || !citizenship.nationality) {
      return { 'citizenshipNotSelected': true };
    }
    return null;
  }

  static occupationSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const occupation = control.value;
    if (occupation === '') {
      return null;
    }
    if (!occupation ) {
      return { 'occupationNotSelected': true };
    }
    return null;
  }
  static companyCategorySelectedValidator(control: FormControl): { [key: string]: any } | null {
    const companyCategory = control.value;
    if (companyCategory === '') {
      return null;
    }
    if (!companyCategory || !companyCategory.companyCategoryName) {
      return { 'companyCategoryNotSelected': true };
    }
    return null;
  }

  static natureOfBusinessSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const natureOfBusiness = control.value;
    if (natureOfBusiness === '') {
      return null;
    }
    if (!natureOfBusiness || !natureOfBusiness.natureOfBusiness) {
      return { 'natureOfBusinessNotSelected': true };
    }
    return null;
  }

  static numberValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { requireNumber: true };
    }
    const pattern = /^[0-9]+$/;
    if (!pattern.test(value)) {
      return { invalidNumberPattern: true };
    }
    return null;
  }

  static classOfVehicleSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const classOfVehicle = control.value;
    if (classOfVehicle === '') {
      return null;
    }
    if (!classOfVehicle || !classOfVehicle.acsDomainCode) {
      return { 'classOfVehicleNotSelected': true };
    }
    return null;
  }

  static vehicleMakeSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const vehicleMake = control.value;
    if (vehicleMake === '') {
      return null;
    }
    if (!vehicleMake || !vehicleMake.idVehicleMake) {
      return { 'vehicleMakeNotSelected': true };
    }
    return null;
  }

  static minLength(control: FormControl): { [key: string]: any } | null {
    const vehicleMake = control.value;

    if (!vehicleMake || vehicleMake.length < 1) {
      return { 'minLength': true };
    }

    return null;
  }

  static vehicleModelSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const vehicleModel = control.value;
    if (vehicleModel === '') {
      return null;
    }
    if (!vehicleModel || !vehicleModel.model) {
      return { 'vehicleModelNotSelected': true };
    }
    return null;
  }

  static salesCampaignlSelectedValidator(control: FormControl): { [key: string]: any } | null {
    const salesCampaign = control.value;
    if (salesCampaign === '') {
      return null;
    }
    if (!salesCampaign || !salesCampaign.salesCampaign) {
      return { 'salesCampaignNotSelected': true };
    }
    return null;
  }

  static noRegisteredProvince(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    const characterLimit = 3;

    if (value && value.length > characterLimit) {
      return { characterLimitExceeded: true };
    }
    const pattern = /^[0-9]+$/;
    if (!pattern.test(value)) {
      return { invalidNumberPattern: true };
    }

    return null;
  }
  static tradePlate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === '') {
      return null;
    }

    // Updated regex pattern to disallow spaces
    const regex = /^[A-Za-z]\d{2}$/;
    if (!regex.test(value)) {
      return { invalidTradePlate: true };
    }
    return null;
  }
  static selectProvince(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === '') {
      return null;
    }

    // Updated regex pattern to disallow spaces
    const regex = /^[A-Za-z]{0,3}$/;
    if (!regex.test(value)) {
      return { invalidProvinceNumber: true };
    }
    return null;
  }

  static latitude(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === '') {
      return null;
    }

    // Updated regex pattern to match "XX X11" like patterns
    // Two letters, followed by a space, one letter, and then two digits
    const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;

    if (!regex.test(value)) {
      return { latitudeValue: true };
    }
    return null;
  }

  static longitude(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === '') {
      return null;
    }

    // Updated regex pattern to match "XX X11" like patterns
    // Two letters, followed by a space, one letter, and then two digits
    const regex = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

    if (!regex.test(value)) {
      return { longitudeValue: true };
    }
    return null;
  }

}
