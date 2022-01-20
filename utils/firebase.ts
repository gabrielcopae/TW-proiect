import { getAnalytics } from 'firebase/analytics';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyA5Leom2cm6dQD71swNW2QZywWJoBxRro8',
  authDomain: 'gabriel-copae.firebaseapp.com',
  projectId: 'gabriel-copae',
  storageBucket: 'gabriel-copae.appspot.com',
  messagingSenderId: '151766989904',
  appId: '1:151766989904:web:3ed17ae81582b024f4a555',
};

firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(firebaseConfig);

const db = firebase.firestore();
export { firebase, db };
