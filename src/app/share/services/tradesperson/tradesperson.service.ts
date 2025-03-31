import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TradespersonService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTradesPersonData(userId: any) {
    return this.http.get<any>(this.baseUrl + 'tradePerson/get-by-user-id?userId=' + userId);
  }

  verifyTradesPersonState() {

  }
}
