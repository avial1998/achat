import firebase from "firebase";
export const config = {
  apiKey: "AIzaSyCmdfSsvmkDDw6u_G1xWgyopqViJPIY1Uk",
  authDomain: "avialapp.firebaseapp.com",
  databaseURL: "https://avialapp-default-rtdb.firebaseio.com",
  projectId: "avialapp",
  storageBucket: "avialapp.appspot.com",
  messagingSenderId: "735094688745",
  appId: "1:735094688745:web:dcc3e11195ef3f59f3d978",
  measurementId: "G-X431DJ8E46",
};
firebase.initializeApp(config);

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
