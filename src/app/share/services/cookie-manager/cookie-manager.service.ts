import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {

  }

  public setToken(token: string) {
    this.cookieService.set('token', token, 90);
  }

  public tokenIsExists(name: string): boolean {
    return this.cookieService.check(name);
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public setTenantId(tenantId: string) {
    this.cookieService.set('tenantId', tenantId, 90);
  }

  public tenantIdIsExists(name: string): boolean {
    return this.cookieService.check(name);
  }

  public getTenantId(): string {
    return this.cookieService.get('tenantId');
  }

  public setPersonalData(data: any) {
    this.cookieService.set('data', JSON.stringify(data), 90);
  }

  public personalDataIsExists(): boolean {
    return this.cookieService.check('data');
  }

  public getPersonalData(): string {
    return this.cookieService.get('data');
  }

  public logout() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/security/login');
  }


}
