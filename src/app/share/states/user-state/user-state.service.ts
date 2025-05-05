import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface User {
  id: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userType = new BehaviorSubject<string>('CLIENT');
  userType$ = this.userType.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  setUserType(userType: string) {
    // Store the userType in sessionStorage to persist across page refreshes
    sessionStorage.setItem('userType', userType);
    this.userType.next(userType);
  }

  setCurrentUser(user: User) {
    // Store the user in sessionStorage to persist across page refreshes
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  constructor() {
    // Initialize userType from sessionStorage if available, otherwise use the default 'CLIENT'
    const storedUserType = sessionStorage.getItem('userType');
    if (storedUserType) {
      this.userType.next(storedUserType);
    }

    // Initialize currentUser from sessionStorage if available
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }
}
