// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adminEmail: 'helpyeahapp@gmail.com',
  firebaseConfig: {
    apiKey: "AIzaSyBI8nX8ryqsmi1ASm0Bnr-lBQ1ui6cJZk8",
    authDomain: "helpyeah-dev.firebaseapp.com",
    databaseURL: "https://helpyeah-dev.firebaseio.com",
    projectId: "helpyeah-dev",
    storageBucket: "helpyeah-dev.appspot.com",
    messagingSenderId: "445278830403",
    appId: "1:445278830403:web:bc9d8109ece65d918539f6",
    measurementId: "G-LFRP8XP0QD"
  },
  algolia: {
    appId: 'latency',
    searchKey: '3d9875e51fbd20c7754e65422f7ce5e1',
    indexName: 'instant_search'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
