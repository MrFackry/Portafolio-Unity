import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyD-J1wgnPZ__U9ezITOWVdCCdtSjTimcA4",
    authDomain: "portafolio-game.firebaseapp.com",
    databaseURL: "https://portafolio-game-default-rtdb.firebaseio.com",
    projectId: "portafolio-game",
    storageBucket: "portafolio-game.firebasestorage.app",
    messagingSenderId: "1010002781956",
    appId: "1:1010002781956:web:17e6fb111ff5a225ead251"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const tarjetasCollection = collection(db, 'tarjetas');

export { db, auth, tarjetasCollection };