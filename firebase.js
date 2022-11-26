import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4V9ji3L_QnKAZ1vYq8245b54jb8TBT-U",
  authDomain: "chat-b746f.firebaseapp.com",
  projectId: "chat-b746f",
  storageBucket: "chat-b746f.appspot.com",
  messagingSenderId: "33281484388",
  appId: "1:33281484388:web:07b025dc1d63a951dba171",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
