// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //******PROD*******//
  // baseUrl:"https://customer.gmmco.in/api/",
  // track_ticket_summary:101563,
  // track_ticket_detail:101562,
  // PM_summary_id:101582,
  // connected_device:101570,
  // jobcode_id:101580,
  // healthalert:101560,
  // workingKey:'5F0D1C411068B130361384783383170C',
  // accesscode:'AVYQ14IH00AD41QYDA',
  // ccAUrl:'https://secure.ccavenue.com/',
  // firebase:{
  //   apiKey: "AIzaSyA2cSHT87PjISQBDuWeDFL4TLyxDLQmInY",
  // authDomain: "gmmco-assist.firebaseapp.com",
  // projectId: "gmmco-assist",
  // storageBucket: "gmmco-assist.appspot.com",
  // messagingSenderId: "692044357098",
  // appId: "1:692044357098:web:43cbaf0188ee50d7106693",
  // measurementId: "G-X9XL0NP2RS"
  // }
 

  //*****UAT******//
  baseUrl: "https://uat-customer.gmmco.in/api/",
  track_ticket_summary: "101293",
  track_ticket_detail: 101294,
  PM_summary_id: 101295,
  connected_device: 101434,
  jobcode_id: 101336,
  healthalert: 101297,
  workingKey:'FF4C98526109B44BEB32E1D8121EF38D',
  accesscode:'AVIG03IG85BN32GINB',
  ccAUrl:'https://test.ccavenue.com/',
  firebase:{}

  //  *****LOCAL*****//
  // baseUrl:"https://gmmco.colanonline.net/api/",
  // track_ticket_summary: "101293",
  // track_ticket_detail: 101294,
  // PM_summary_id: 101295,
  // connected_device: 101297,
  // jobcode_id: 101336,
  // healthalert: 101297

};

//"CCAvenueKey": {PRODUCTION
  //  "WorkingKey": "5F0D1C411068B130361384783383170C",
  //  "AccessCode": "AVYQ14IH00AD41QYDA",
  //  "CCAURL": "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest="
  //},

  //"CCAvenueKey": {PRODUCTION
    //  "WorkingKey": "5F0D1C411068B130361384783383170C",
    //  "AccessCode": "AVYQ14IH00AD41QYDA",
    //  "CCAURL": "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest="
    //},
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
