// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl:'http://195.35.21.13:8080/api/v1/',
  // authUrl: "http://195.35.21.13:8080/"

  baseUrl: 'http://localhost:8000/api/v1/',
  authUrl: "http://localhost:8000/",
  // baseUrl: 'http://192.168.8.175:8000/api/v1/',
  // authUrl: "http://192.168.8.175:8000/",
  googleMapsApiKey: 'AIzaSyDNydKhIv4WkXIHXxX_Qi4yitU_Ics15Qg',
  firebaseConfig: {
    apiKey: "AIzaSyDc-seWbLUDXmH_s_gy-EN4Jt89txphSmg",
    authDomain: "chatroomapp-37561.firebaseapp.com",
    projectId: "chatroomapp-37561",
    storageBucket: "chatroomapp-37561.firebasestorage.app",
    messagingSenderId: "1091213864189",
    appId: "1:1091213864189:web:11fb9ba30e8778361b2294",
    measurementId: "G-DTV92E4EF6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
