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
    apiKey: "AIzaSyBUEZC37QIyokQlxDyewEIeIsTMftX78Hk",
    authDomain: "finder-8b826.firebaseapp.com",
    projectId: "finder-8b826",
    storageBucket: "finder-8b826.appspot.com",
    messagingSenderId: "510612128492",
    appId: "1:510612128492:web:02dd8039c9318b442ddbc9",
    measurementId: "G-9GPB07CMKF",
    vapidKey: "BIN2Jc5Yezz9i9OJ9FV4hK3lkhI3MujuXz6-OxkgLXAWgDmL1LtLPYov8Y8oyqFpKyVYRKW5EbhwB6YA_3Dzduc"
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
