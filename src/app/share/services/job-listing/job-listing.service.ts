import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  createJobListing(data: any, userId: any, selectedFile: string | null): Observable<any> {
    console.log(data);
    const formData = new FormData();

    formData.append('userId', userId);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('dto', JSON.stringify(data));

    return this.http.post(
      this.baseUrl + 'job-listing/save',
      formData
    );
  }

  getJobListingsByTradePersonId(tradePersonId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-listing/get-by-trade-person-id?tradePersonId=' + tradePersonId);
  }

  getAllJobsByFilter(category: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-listing/get-all/' + category + '/A');
  }

  getJobListingsByJobListingId(jobListingId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-listing/get-by-id?listingId=' + jobListingId);
  }
}
