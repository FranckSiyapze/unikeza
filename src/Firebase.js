//import * as firebase from 'firebase';

import firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBjhTP_SOiuUwrAtzjakpaZv2zBs6lv7AI",
    authDomain: "unikeza-36da5.firebaseapp.com",
    projectId: "unikeza-36da5",
    storageBucket: "unikeza-36da5.appspot.com",
    messagingSenderId: "96782190392",
    appId: "1:96782190392:web:dea59ad9f59a42ed02a3cd",
    measurementId: "G-FE37LRDKWW"
  };

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;