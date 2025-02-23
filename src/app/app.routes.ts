import {Routes} from '@angular/router';
import {SecurityContextComponent} from './security/security-context/security-context.component';
import {LoginComponent} from './security/login/login.component';
import {SignupComponent} from './security/signup/signup.component';
import {ForgetPasswordPageComponent} from './security/forget-password-page/forget-password-page.component';
import {VerifyYourEmailComponent} from './security/verify-your-email/verify-your-email.component';
import {VerifyForgetPasswordComponent} from './security/verify-forget-password/verify-forget-password.component';
import {ResendCodeEmailComponent} from './security/resend-code-email/resend-code-email.component';
import {LandingPageContextComponent} from './process/landing-page/landing-page-context/landing-page-context.component';
import {ConsoleContextComponent} from './console/console-context/console-context.component';
import {VerificationPoolComponent} from './console/verification-pool/verification-pool.component';
import {PlaygroundComponent} from './console/playground/playground.component';
import {DashboardComponent} from './console/dashboard/dashboard.component';
import {LogoutComponent} from './process/logout/logout.component';
import {UserRegisterComponent} from './process/user-register/user-register.component';
import {ProfileContextComponent} from './console/profile/profile-context/profile-context.component';
import {UserTypeSelectionComponent} from './security/user-type-selection/user-type-selection.component';
import {MyJobsComponent} from './console/my-jobs/my-jobs.component';
import {MyScheduleComponent} from './console/my-schedule/my-schedule.component';
import {MessagesComponent} from './console/messages/messages.component';
import {HireTradesmenComponent} from './console/hire-tradesmen/hire-tradesmen.component';

export const routes: Routes = [
  {path: '', redirectTo: 'security/login', pathMatch: 'full'},
  {
    path: 'security', component: SecurityContextComponent, children: [
      {path: '', redirectTo: 'user-type', pathMatch: 'full'},
      {path: 'user-type', component: UserTypeSelectionComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'forgot-password', component: ForgetPasswordPageComponent},
      {path: 'verify/:email', component: VerifyYourEmailComponent},
      {path: 'verify-password-reset/:email', component: VerifyForgetPasswordComponent},
      {path: 'resend', component: ResendCodeEmailComponent},
    ]
  },
  {
    path: 'console', component: ConsoleContextComponent, children: [
      {path: '', redirectTo: 'verification', pathMatch: 'full'},
      {path: 'verification', component: VerificationPoolComponent},
      {
        path: 'playground', component: PlaygroundComponent, children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'my-schedule', component: MyScheduleComponent},
          {path: 'hire-trades-person', component: HireTradesmenComponent},
          {path: 'my-jobs', component: MyJobsComponent},
          {path: 'messages', component: MessagesComponent},
          {path: 'my-profile', component: ProfileContextComponent},
        ]
      },
    ]
  },
  {
    path: 'process', component: SecurityContextComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: LandingPageContextComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: UserRegisterComponent},
    ]
  }
];
