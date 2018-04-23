import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBn3hpu2HTAJ7uBIyYS6txUqw_EeR4nPGE',
  authDomain: 'jsbooks-e7ca4.firebaseapp.com',
  databaseURL: 'https://jsbooks-e7ca4.firebaseio.com',
  projectId: 'jsbooks-e7ca4',
  storageBucket: '',
  messagingSenderId: '259632657019'
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
