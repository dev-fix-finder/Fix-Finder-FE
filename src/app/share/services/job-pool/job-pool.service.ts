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

  getJobsByUserId(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-pool/get-by-user-id?userId=' + userId);
  }

  getJobsByTradePersonId(tradePersonId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'job-pool/get-by-tradePersonId?tradePersonId=' + tradePersonId);
  }

  getJobDetailsById(jobId: string): Observable<any> {
    return this.http.get(this.baseUrl + 'job-pool/get-by-id?jobId=' + jobId);
  }

  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put(this.baseUrl + 'job-pool/update?jobId=' + jobId, jobData);
  }
}
