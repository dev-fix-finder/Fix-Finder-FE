import {Component} from '@angular/core';
import {CookieManagerService} from '../../share/services/cookie-manager/cookie-manager.service';
import {AuthService} from '../../share/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verification-pool',
  imports: [],
  templateUrl: './verification-pool.component.html',
  standalone: true,
  styleUrl: './verification-pool.component.scss'
})
export class VerificationPoolComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieManager: CookieManagerService
  ) {
  }

  ngOnInit(): void {
    this.check();
  }

  private check() {
    this.router.navigateByUrl('/console/playground/dashboard').then();
    /* this.loadingService.mainLoader.next(true);
     if (this.cookieManager.tokenIsExists('token')) {
       this.authService.getUserData(this.cookieManager.getToken()).subscribe(response => {
         if (response.code === 200) {
           this.cookieManager.setPersonalData(response.data);
           let tempArr: [] = response.data.role;
           let selectedRole = tempArr.find(e => e == 'STUDENT');
           if (selectedRole) {
             this.studentService.getStudentData(response.data.property_id).subscribe(studentData => {
               if (studentData.code === 200) {
                 this.studentService.verifyStudentState().subscribe(response => {
                   if (response.data) {
                     this.cookieManager.setStudentId(studentData.data);
                     this.router.navigateByUrl('/console/playground/home');
                     return;
                   } else {
                     this.router.navigateByUrl('/process/student-status');
                     return;
                   }
                 });
               }
             })
           } else {
             this.router.navigateByUrl('/process/student-registration');
           }
         }
       })

       //     this.cookieManager.logout();
       //     this.router.navigateByUrl('/security/login').then();

     } else {
       this.cookieManager.logout();
       this.router.navigateByUrl('/security/login').then();
     }
     this.loadingService.mainLoader.next(false);*/
  }
}
