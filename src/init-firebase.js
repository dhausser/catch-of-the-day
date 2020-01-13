import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB8m_dwpTat4kzTRsD9HXifKSwmQgv0ZuE',
  authDomain: 'catch-of-the-day-davy-hausser.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-davy-hausser.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export default base;
export { firebaseApp };
