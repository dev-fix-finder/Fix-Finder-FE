import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  updateProfilePicture(blobData: Blob, userId: string): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', blobData);

    return this.http.put(this.baseUrl + 'user/update-user-profile-picture', formData);
  }

  getProfilePicture(userId: string): Observable<any> {
    return this.http.get(this.baseUrl + 'user/get-user-profile-picture?userId=' + userId);
  }
}
