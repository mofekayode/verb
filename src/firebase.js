import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC6m9FJsKeSCD7f8ND_UencxYGhnXYicWE",
    authDomain: "chatapp-43693.firebaseapp.com",
    projectId: "chatapp-43693",
    storageBucket: "chatapp-43693.appspot.com",
    messagingSenderId: "912548068355",
    appId: "1:912548068355:web:71b523abcc3e346a686236",
    measurementId: "G-07424D2SXT"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth =firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
export {auth,provider};
export default db;