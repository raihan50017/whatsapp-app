import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAPEpu3BzSSIfHSgstIU45Fx7ILX0F5Yc8",
  authDomain: "whatsapp-app-aec4e.firebaseapp.com",
  databaseURL: "https://whatsapp-app-aec4e.firebaseio.com",
  projectId: "whatsapp-app-aec4e",
  storageBucket: "whatsapp-app-aec4e.appspot.com",
  messagingSenderId: "979810286341",
  appId: "1:979810286341:web:8a863d3da87b991246956c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;