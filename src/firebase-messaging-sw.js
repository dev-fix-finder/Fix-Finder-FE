// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBUEZC37QIyokQlxDyewEIeIsTMftX78Hk",
  authDomain: "finder-8b826.firebaseapp.com",
  projectId: "finder-8b826",
  storageBucket: "finder-8b826.firebasestorage.app",
  messagingSenderId: "510612128492",
  appId: "1:510612128492:web:02dd8039c9318b442ddbc9",
  measurementId: "G-9GPB07CMKF",
  vapidKey: "BIN2Jc5Yezz9i9OJ9FV4hK3lkhI3MujuXz6-OxkgLXAWgDmL1LtLPYov8Y8oyqFpKyVYRKW5EbhwB6YA_3Dzduc"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  try {
    // Customize notification here
    const notificationTitle = payload.notification.title || 'New Notification';
    const notificationOptions = {
      body: payload.notification.body || 'You have a new notification',
      icon: '/assets/icons/icon-72x72.png',
      badge: '/assets/icons/icon-72x72.png',
      data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Error showing notification:', error);
  }
});

// Log any errors
self.addEventListener('error', (event) => {
  console.error('[firebase-messaging-sw.js] Service worker error:', event.error);
});

// Log when the service worker is activated
self.addEventListener('activate', (event) => {
  console.log('[firebase-messaging-sw.js] Service worker activated');
});

// Log when the service worker is installed
self.addEventListener('install', (event) => {
  console.log('[firebase-messaging-sw.js] Service worker installed');
});
