// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyA88wz_eJ2b8SOQvZB_tbyonEMuekSm6rU',
    authDomain: 'login-facebook-ec109.firebaseapp.com',
    projectId: 'login-facebook-ec109',
    storageBucket: 'login-facebook-ec109.appspot.com',
    messagingSenderId: '1088661520280',
    appId: '1:1088661520280:web:061fd9ea9a53af7624f5ed',
    measurementId: 'G-N9B1BNNTNC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new FacebookAuthProvider();

export { auth, provider };
