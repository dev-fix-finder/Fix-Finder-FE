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

export const routes: Routes = [
  {path: '', redirectTo: 'security/login', pathMatch: 'full'},
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
        ]
      },
    ]
  },
  {
    path: 'process', component: SecurityContextComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: LandingPageContextComponent},
      {path: 'logout', component: LogoutComponent},
    ]
  }
];
