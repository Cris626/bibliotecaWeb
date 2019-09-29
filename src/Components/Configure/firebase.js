import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC65H2MhayDM1mVjYvG4UtafEnLiDGNUaw",
    authDomain: "biblioteca-ee101.firebaseapp.com",
    databaseURL: "https://biblioteca-ee101.firebaseio.com",
    projectId: "biblioteca-ee101",
    storageBucket: "biblioteca-ee101.appspot.com",
    messagingSenderId: "439083897642",
    appId: "1:439083897642:web:32b74112671aac379b4453"
  };

  firebase.initializeApp(firebaseConfig);

  export const myFirebase = firebase;
  export const myFirestore = firebase.firestore();