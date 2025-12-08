// /source/firebase-config.js

// TODO: Replace with your specific Firebase Project Config
const firebaseConfig = {

  apiKey: "AIzaSyCHZxggLqL4sF6uCn4VHaFkL5nwTMzz4Cw",

  authDomain: "giftos-ba832.firebaseapp.com",

  projectId: "giftos-ba832",

  storageBucket: "giftos-ba832.firebasestorage.app",

  messagingSenderId: "642831750676",

  appId: "1:642831750676:web:188b3899f794b06832b901"

};


// Initialize Firebase (CDN links will be in index.html)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();