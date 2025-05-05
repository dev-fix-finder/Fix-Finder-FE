import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradespersonService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  saveTradePerson(tradesPerson: any, userId: any): Observable<any> {
    return this.http.post(this.baseUrl + 'tradePerson/save?userId=' + userId, tradesPerson)
  }

  updateTradePerson(userData: any, tradePersonId: any): Observable<any> {
    return this.http.put(this.baseUrl + 'tradePerson/update-tradePerson?tradePersonId=' + tradePersonId, userData)
  }

  verifyTradesPersonState() {
    // Placeholder for future implementation
  }

  submitVerification(verificationData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'tradePerson/submit-verification', verificationData);
  }

  getTradesPersonByUserId(userId: any) {
    return this.http.get<any>(this.baseUrl + 'tradePerson/get-by-user-id?userId=' + userId);
  }

  getAllocatedTimes(tradespersonId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'job-pool/get-allocated-times?tradePersonId=' + tradespersonId);
  }
}
