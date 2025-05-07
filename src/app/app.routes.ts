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
import {MyJobsComponent} from './console/my-jobs/my-jobs.component';
import {MyScheduleComponent} from './console/my-schedule/my-schedule.component';
import {HireTradesmenComponent} from './console/hire-tradesmen/hire-tradesmen.component';
import {ProfileCardComponent} from './share/components/profile-cards/profile-card/profile-card.component';
import {
  AdminTradesPersonVerifyComponent
} from './console/admin-trades-person-verify/admin-trades-person-verify.component';
import {JobDescriptionComponent} from './console/my-jobs/job-description/job-description.component';
import {MessagesComponent} from './console/messages/messages.component';
import {
  TradePersonVerificationComponent
} from './console/trade-person-verification/trade-person-verification.component';

export const routes: Routes = [
  {path: '', redirectTo: 'process/home', pathMatch: 'full'},
  {
    path: 'security', component: SecurityContextComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
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
          {path: 'tp-verification', component: TradePersonVerificationComponent},
          {path: 'my-schedule', component: MyScheduleComponent},
          {path: 'messages', component: MessagesComponent},
          {path: 'hire-trades-person', component: HireTradesmenComponent},
          {path: 'my-jobs', component: MyJobsComponent},
          {path: 'my-profile', component: ProfileContextComponent},
          {path: 'trades-person-verify', component: AdminTradesPersonVerifyComponent},
          {path: 'trades-person/profile/:jobListingId', component: ProfileCardComponent},
          {path: 'JobDescriptionComponent', component: JobDescriptionComponent},
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
