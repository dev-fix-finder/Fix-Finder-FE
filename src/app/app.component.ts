import {Component, OnInit, OnDestroy} from '@angular/core';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';

import {RouterOutlet} from '@angular/router';
import {MainLoaderComponent} from './share/components/main-loader/main-loader.component';
import {FirebaseService} from './share/services/firebase/firebase.service';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ScheduleModule, RecurrenceEditorModule,
    RouterOutlet,
    MainLoaderComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Fix-Finder';
  private fcmSupportSubscription: Subscription | null = null;
  private hasShownNotification = false; // Track if we've already shown the notification

  constructor(
    private firebaseService: FirebaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
   /* // Check if Firebase Cloud Messaging is supported
    this.fcmSupportSubscription = this.firebaseService.isFCMSupported().subscribe(isSupported => {
      // Only show the notification once and only if FCM is not supported
      if (isSupported === false && !this.hasShownNotification) {
        this.hasShownNotification = true; // Mark that we've shown the notification

        // Show a notification to the user when FCM is not supported
        /!*this.toastr.warning(
          'Push notifications are not supported in this browser. If you are using Brave browser, you may need to adjust your shield settings or use a different browser for notifications.',
          'Notification Support Limited',
          {
            timeOut: 5000, // Show for 10 seconds
            closeButton: true,
            positionClass: 'toast-top-right',
            tapToDismiss: true,
            disableTimeOut: false, // Ensure the toast is dismissed after timeout
            progressBar: true // Show progress bar for better user feedback
          }
        );*!/
      }
    });*/
  }

  ngOnDestroy() {
   /* // Clean up subscription to prevent memory leaks
    if (this.fcmSupportSubscription) {
      this.fcmSupportSubscription.unsubscribe();
    }*/
  }
}
