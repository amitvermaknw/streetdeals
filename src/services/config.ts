import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { config } from '../../firebaseConfig';
import { getFirestore } from "firebase/firestore";
// import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId,
    databaseURL: config.databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
// const messaging = getMessaging(app);

export { app, db }