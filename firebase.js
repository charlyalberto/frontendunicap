import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import 'firebase/compat/auth'

const firebaseConfiguracao = {
  apiKey: "AIzaSyBdgCZqpWUj73YFiEt1OEUr8YmLUSSurDY",
  authDomain: "mynotes-9ecf8.firebaseapp.com",
  projectId: "mynotes-9ecf8",
  storageBucket: "mynotes-9ecf8.appspot.com",
    messagingSenderId: "974761909870",
  appId: "1:974761909870:web:9fb9f87e651df2d2e1107f"
}
firebase.initializeApp(firebaseConfiguracao);

export const app = firebase.app();
export default firebase