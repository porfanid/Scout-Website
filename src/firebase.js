import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBPI1rSdv3if62Dp67hjHKqGk-Vwbq58vo",
    authDomain: "ioannina-scouts.firebaseapp.com",
    projectId: "ioannina-scouts",
    storageBucket: "ioannina-scouts.firebasestorage.app",
    messagingSenderId: "800109105879",
    appId: "1:800109105879:web:9a09ef6bb19769081b9692",
    measurementId: "G-VQMCWMXT54"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app);

/**
if (import.meta.env.MODE === 'development') {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectFunctionsEmulator(functions, 'localhost', 5001);
}
 **/

export { app, auth, analytics, db, functions };