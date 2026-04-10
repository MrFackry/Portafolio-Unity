// js/app.js
import { getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { tarjetasCollection } from './fireBase.js';
import { crearTarjeta, crearTarjetaEnDOM } from './proyecto.js';
import { mostrarWidgetDeSubida } from './cloudinary.js';
import './auth.js';

// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar tarjetas existentes desde Firestore
        const querySnapshot = await getDocs(tarjetasCollection);
        querySnapshot.forEach((doc) => {
            const tarjetaData = doc.data();
            const contenedorId = tarjetaData.tipoTarjeta === 'proyectos'
                ? 'contenedorTarjetasProyectos'
                : 'contenedorTarjetasPrototipos';
            const contenedor = document.getElementById(contenedorId);
            if (contenedor) {
                crearTarjetaEnDOM(tarjetaData, contenedor);
            }
        });

        // Conectar botones
        document.getElementById('botonCrearTarjeta')
            ?.addEventListener('click', crearTarjeta);

        document.getElementById('botonSubirImagen')
            ?.addEventListener('click', mostrarWidgetDeSubida);

    } catch (e) {
        console.error("Error en la carga inicial: ", e);
    }
});