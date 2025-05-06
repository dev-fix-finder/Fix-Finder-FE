import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobListingService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  createJobListing(data: any, userId: string, listingFile: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId);

    // Append each property as separate fields
    formData.append('categoryId', data.categoryId.toString()); // Ensure to append as string
    formData.append('pricePerHour', data.pricePerHour.toString());
    formData.append('description', data.description);
    formData.append('title', data.title);

    // Convert the list of skills to a comma-separated string and append it
    formData.append('skills', data.skills.join(','));

    // If there is a file, append it to the formData
    if (listingFile) {
      formData.append('file', listingFile);
    }

    return this.http.post(this.baseUrl + 'job-listing/save', formData);
  }

  getJobListingsByTradePersonId(tradePersonId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-listing/get-by-trade-person-id?tradePersonId=' + tradePersonId);
  }

  getAllJobListingsByFilter(category: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-listing/get-all/' + category + '/A');
  }

  getJobListingsByJobListingId(jobListingId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-listing/get-by-id?listingId=' + jobListingId);
  }
}
