// js/auth_general.js
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { auth } from './fireBase.js';

const subirSeccion = document.getElementById("subirSeccion");

onAuthStateChanged(auth, (user) => {
    if (subirSeccion) {
        subirSeccion.style.display = user ? "block" : "none";
    }
});