import Rebase from 're-base';
import { initializeApp, database } from 'firebase';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB8m_dwpTat4kzTRsD9HXifKSwmQgv0ZuE",
  authDomain: "catch-of-the-day-davy-hausser.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-davy-hausser.firebaseio.com",
});

const base = Rebase.createClass(database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;