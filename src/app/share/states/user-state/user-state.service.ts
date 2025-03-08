import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userType = new BehaviorSubject<string>('CLIENT');
  userType$ = this.userType.asObservable();

  setUserType(userType: string) {
    this.userType.next(userType);
  }

  constructor() { }
}
