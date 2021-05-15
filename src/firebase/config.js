import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDzb3EeaoP6U0L-m5j2XVdM0v1s6yjEUDo",
    authDomain: "ecopup-8acb0.firebaseapp.com",
    databaseURL: "https://ecopup-8acb0-default-rtdb.firebaseio.com",
    projectId: "ecopup-8acb0",
    storageBucket: "ecopup-8acb0.appspot.com",
    messagingSenderId: "618393973221",
    appId: "1:618393973221:web:2ad2c6b08a28af8e9dff0c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };