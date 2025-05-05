import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private firestoreDb: any;
  private auth = getAuth(this.firebaseApp);

  // Initialize Firestore with custom settings
  private initializeFirestore() {
    try {
      // Initialize Firestore with custom settings for better reliability
      this.firestoreDb = initializeFirestore(this.firebaseApp, {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED, // Unlimited cache size for better offline support
        ignoreUndefinedProperties: true, // Ignore undefined fields in documents
        experimentalForceLongPolling: true, // Use long polling instead of WebSockets for more reliable connections
        experimentalAutoDetectLongPolling: true // Automatically detect if long polling should be used
      });

      console.log('Firestore initialized with custom settings');
      return this.firestoreDb;
    } catch (error) {
      console.error('Error initializing Firestore with custom settings:', error);
      // Fallback to default initialization
      this.firestoreDb = getFirestore(this.firebaseApp);
      console.log('Fallback: Firestore initialized with default settings');
      return this.firestoreDb;
    }
  }
  private messaging: any;

  private currentMessage = new BehaviorSubject<any>(null);
  currentMessage$ = this.currentMessage.asObservable();

  // Track FCM support status
  private fcmSupported = new BehaviorSubject<boolean | null>(null);
  fcmSupported$ = this.fcmSupported.asObservable();

  constructor() {
    // Initialize Firestore with custom settings
    this.initializeFirestore();
    // Initialize Firebase Messaging
    this.initializeFirebaseMessaging();
  }

  getFirestoreDb() {
    // Ensure Firestore is initialized
    if (!this.firestoreDb) {
      this.initializeFirestore();
    }
    return this.firestoreDb;
  }

  getAuth() {
    return this.auth;
  }

  getMessaging() {
    return this.messaging;
  }

  /**
   * Check if Firebase Cloud Messaging is supported in the current browser
   * @returns Observable<boolean | null> - true if supported, false if not, null if not yet determined
   */
  isFCMSupported() {
    return this.fcmSupported$;
  }

  /**
   * Get the current FCM support status
   * @returns boolean | null - true if supported, false if not, null if not yet determined
   */
  getFCMSupportStatus() {
    return this.fcmSupported.getValue();
  }

  // Initialize Firebase Cloud Messaging
  private async initializeFirebaseMessaging() {
    try {
      // Check if the browser supports Firebase Cloud Messaging
      const isFCMSupported = await isSupported();

      // Update FCM support status
      this.fcmSupported.next(isFCMSupported);

      if (!isFCMSupported) {
        console.log('Firebase Cloud Messaging is not supported in this browser');
        // Brave browser often blocks FCM due to its privacy features
        console.log('If you are using Brave browser, you may need to adjust your shield settings or use a different browser for notifications');
        return;
      }

      // Initialize messaging only if supported
      this.messaging = getMessaging(this.firebaseApp);

      // Register the service worker
      if ('serviceWorker' in navigator) {
        try {
          // Check if service worker is already registered
          let registration;
          const registrations = await navigator.serviceWorker.getRegistrations();
          const existingRegistration = registrations.find(reg =>
            reg.scope.includes('firebase-messaging-sw.js') || reg.active?.scriptURL.includes('firebase-messaging-sw.js')
          );

          if (existingRegistration) {
            console.log('Using existing service worker registration', existingRegistration);
            registration = existingRegistration;
          } else {
            // Register new service worker
            registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
              scope: '/'
            });
            console.log('New service worker registered', registration);
          }
          console.log('Service worker registered successfully', registration);

          // Request permission for notifications
          const permission = await Notification.requestPermission();

          if (permission === 'granted') {
            console.log('Notification permission granted.');

            // Get FCM token
            try {
              console.log('Attempting to get FCM token with VAPID key:', environment.firebaseConfig.vapidKey.substring(0, 10) + '...');

              // Wait for the service worker to be fully activated
              if (registration.installing || registration.waiting) {
                console.log('Waiting for service worker to be activated...');
                await new Promise<void>((resolve) => {
                  // Use type assertion to fix TypeScript error TS2339
                  (registration as ServiceWorkerRegistration & { ready: Promise<ServiceWorkerRegistration> }).ready.then(() => {
                    console.log('Service worker is now active');
                    resolve();
                  });
                });
              }

              const currentToken = await getToken(this.messaging, {
                vapidKey: environment.firebaseConfig.vapidKey,
                serviceWorkerRegistration: registration
              });

              if (currentToken) {
                console.log('FCM token successfully retrieved:', currentToken.substring(0, 10) + '...');
                // Here you would typically send this token to your server
              } else {
                console.warn('No registration token available. This could be due to:');
                console.warn('1. The notification permission was not granted');
                console.warn('2. The VAPID key is incorrect');
                console.warn('3. The service worker registration failed');
              }
            } catch (tokenError: unknown) {
              console.error('An error occurred while retrieving token:', tokenError);

              // Type guard to check if tokenError is an object with code property
              if (tokenError && typeof tokenError === 'object' && 'code' in tokenError) {
                if ((tokenError as { code: string }).code === 'messaging/permission-blocked') {
                  console.error('Notifications are blocked by the browser. The user must change this in their browser settings.');
                } else if ((tokenError as { code: string }).code === 'messaging/unsupported-browser') {
                  console.error('This browser does not support the Web Push API.');
                }
              }

              // Type guard to check if tokenError is an object with message property
              if (tokenError && typeof tokenError === 'object' && 'message' in tokenError &&
                  typeof (tokenError as { message: string }).message === 'string' &&
                  (tokenError as { message: string }).message.includes('AbortError')) {
                console.error('AbortError detected. This may be due to:');
                console.error('1. The service worker is not properly registered');
                console.error('2. The VAPID key is incorrect or malformed');
                console.error('3. The browser is blocking the push service');
                console.error('4. There might be network connectivity issues');
              }
            }
          } else {
            console.log('Unable to get permission to notify.');
          }

          // Handle incoming messages
          onMessage(this.messaging, (payload) => {
            console.log('Message received:', payload);
            this.currentMessage.next(payload);
          });

        } catch (swError) {
          console.error('Service worker registration failed:', swError);
        }
      } else {
        console.log('Service workers are not supported in this browser');
      }
    } catch (error) {
      console.error('Error initializing Firebase messaging:', error);
    }
  }
}
