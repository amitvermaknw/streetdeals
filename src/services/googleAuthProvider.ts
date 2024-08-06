import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebaseConfig';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const config = {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain
};

// Initialize Firebase
initializeApp(config);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export { auth, googleProvider };
