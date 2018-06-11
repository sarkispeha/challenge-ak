 // Initialize Firebase
import keys from '../config/keys';

import * as firebase from 'firebase';

const config = {
    apiKey: keys.firebaseApiKey,
    authDomain: keys.firebaseAuthDomain,
    databaseURL: keys.firebaseDatabaseURL,
    projectId: keys.firebaseProjectId,
    storageBucket: keys.firebaseStorageBucket,
    messagingSenderId: keys.firebaseMessagingSenderId,
};

if (!firebase.apps.length) {
firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };