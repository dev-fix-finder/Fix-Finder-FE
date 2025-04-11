import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPoolService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  hireTradePerson(jobData: any, userId: any, jobListingId: any): Observable<any> {
    return this.http.post(this.baseUrl + 'job-pool/hire?jobListingId=' + jobListingId + '&userId=' + userId, jobData);
  }
}
