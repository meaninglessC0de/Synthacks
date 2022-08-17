import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDhVBBlDCWCCiT8tjs2CPNpqWTMIybupyI",
  authDomain: "mymoney-c54ad.firebaseapp.com",
  projectId: "mymoney-c54ad",
  storageBucket: "mymoney-c54ad.appspot.com",
  messagingSenderId: "926941664594",
  appId: "1:926941664594:web:3c60b83326aee97f89d68b"
};
// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }