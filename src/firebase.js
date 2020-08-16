import firebase from "firebase";

    const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyDZ0WfgV5DiaFbPlyBWb8OYjG1JuRchBtE",
    authDomain: "instaclone-37000.firebaseapp.com",
    databaseURL: "https://instaclone-37000.firebaseio.com",
    projectId: "instaclone-37000",
    storageBucket: "instaclone-37000.appspot.com",
    messagingSenderId: "1000002224440",
    appId: "1:1000002224440:web:43c7c8e7eb2207500c01cd",
    measurementId: "G-CP622HQYHM"
  });
  
 
  const db=firebaseapp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  export{db,auth,storage,firebase};



  export default firebase;