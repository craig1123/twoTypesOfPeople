import firebase from 'firebase'
import keys from "./../keys";

const config = {
    apiKey: keys.apiKey,
    authDomain: "two-types-of-people.firebaseapp.com",
    databaseURL: "https://two-types-of-people.firebaseio.com",
    projectId: "two-types-of-people",
    storageBucket: "",
    messagingSenderId: keys.messagingSenderId
};

firebase.initializeApp(config);
export default firebase;
