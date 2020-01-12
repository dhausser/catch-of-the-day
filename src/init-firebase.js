import Rebase from 're-base';
import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB8m_dwpTat4kzTRsD9HXifKSwmQgv0ZuE",
  authDomain: "catch-of-the-day-davy-hausser.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-davy-hausser.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export default base;
export { firebaseApp };
