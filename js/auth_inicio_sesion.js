// js/auth_inicio_sesion.js
import { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { auth } from './fireBase.js';

// Redirige si ya está logueado
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuario ya autenticado, redirigiendo...");
        window.location.href = 'index.html';
    }
});

// Maneja el submit del formulario
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario inició sesión correctamente');
        window.location.href = 'index.html';
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
        console.error('Error al iniciar sesión:', error);
    }
});