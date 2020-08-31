import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCOriLTzlIaKJ4IHVtW5UJvAUdYxhofPgw',
  authDomain: 'revents-firestore.firebaseapp.com',
  databaseURL: 'https://revents-firestore.firebaseio.com',
  projectId: 'revents-firestore',
  storageBucket: 'revents-firestore.appspot.com',
  messagingSenderId: '743980815094',
  appId: '1:743980815094:web:08ff4c08a17aaff4e492d7',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
