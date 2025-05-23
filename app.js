import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
// import { getDatabase, ref as dbRef, push, get } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyD-J1wgnPZ__U9ezITOWVdCCdtSjTimcA4",
    authDomain: "portafolio-game.firebaseapp.com",
    databaseURL: "https://portafolio-game-default-rtdb.firebaseio.com",
    projectId: "portafolio-game",
    storageBucket: "portafolio-game.firebasestorage.app", // Este valor aún es necesario para la configuración general de Firebase
    messagingSenderId: "1010002781956",
    appId: "1:1010002781956:web:17e6fb111ff5a225ead251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Para Firestore
// const dbRT = getDatabase(app); // Para Realtime Database
// const storage = getStorage(app); // para storage
const tarjetasCollection = collection(db, 'tarjetas'); 

const subirSeccion = document.getElementById("subirSeccion");

//muestra la section par subir
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (subirSeccion) {
            subirSeccion.style.display = "block";
        }
    } else {
        if (subirSeccion) {
            subirSeccion.style.display = "none";
        }
    }
});

// Funcion para crear una tarjeta y guardarla en Firestore
async function crearTarjeta() {
    // Obtiene la URL de la imagen directamente del input (que sera llenado por Cloudinary)
    const imageUrl = document.getElementById('imageUrl').value;
    const rolText = document.getElementById('rolText').value;
    const linkUrl = document.getElementById('linkUrl').value;
    const buttonText = document.getElementById('buttonText').value;
    const tipoTarjeta = document.getElementById('tipoTarjeta').value;
    const contenedorTarjetasId = (tipoTarjeta === 'proyectos') ? 'contenedorTarjetasProyectos' : 'contenedorTarjetasPrototipos';
    const contenedorTarjetas = document.getElementById(contenedorTarjetasId);

    // Valida que la URL de la imagen no esté vacía
    if (!imageUrl) {
        console.error("Por favor, ingresa la URL de la imagen.");
        return;
    }

    const tarjetaData = {
        imageUrl: imageUrl, // Usa la URL obtenida de Cloudinary
        rolText: rolText,
        linkUrl: linkUrl,
        buttonText: buttonText,
        tipoTarjeta: tipoTarjeta,
        timestamp: new Date() // Para ordenar las tarjetas por fecha de creación
    };

    try {
        // Añade la tarjeta a la coleccion de Firestore
        const docRef = await addDoc(tarjetasCollection, tarjetaData);
        console.log("Tarjeta agregada con ID: ", docRef.id);
        // Crea la tarjeta en el DOM inmediatamente
        crearTarjetaEnDOM(tarjetaData, contenedorTarjetas);
        // Resetea el formulario despues de la creacion exitosa
        document.getElementById('cardForm').reset();
    } catch (error) {
        console.error("Error al agregar la tarjeta: ", error);
    }
}

// Funcion para crear y añadir la tarjeta al DOM
function crearTarjetaEnDOM(data, contenedor) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('cards');
    cardDiv.setAttribute('data-aos', 'fade-up');

    const imgCardDiv = document.createElement('div');
    imgCardDiv.classList.add('img-card');
    const img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = data.rolText; // Mejorar el alt text para accesibilidad
    imgCardDiv.appendChild(img);

    const infoCardDiv = document.createElement('div');
    infoCardDiv.classList.add('info-card');
    const rolP = document.createElement('p');
    rolP.textContent = 'Rol:';
    const rolesP = document.createElement('p');
    rolesP.textContent = data.rolText;

    const enlaceA = document.createElement('a');
    enlaceA.href = data.linkUrl;
    enlaceA.classList.add('button');
    enlaceA.textContent = data.buttonText;
    enlaceA.target = "_blank"; // Abrir enlace en nueva pestaña

    infoCardDiv.appendChild(rolP);
    infoCardDiv.appendChild(rolesP);
    infoCardDiv.appendChild(enlaceA);

    cardDiv.appendChild(imgCardDiv);
    cardDiv.appendChild(infoCardDiv);

    contenedor.appendChild(cardDiv);
}

// Listener principal que se ejecuta cuando el DOM esta completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar tarjetas existentes desde Firestore al cargar la página
        const querySnapshot = await getDocs(tarjetasCollection);
        querySnapshot.forEach((doc) => {
            const tarjetaData = doc.data();
            const contenedorTarjetasId = (tarjetaData.tipoTarjeta === 'proyectos') ? 'contenedorTarjetasProyectos' : 'contenedorTarjetasPrototipos';
            const contenedorTarjetas = document.getElementById(contenedorTarjetasId);
            if (contenedorTarjetas) {
                crearTarjetaEnDOM(tarjetaData, contenedorTarjetas);
            }
        });

        // Agregar event listener al botón de crear tarjeta (del formulario)
        const botonCrearTarjeta = document.getElementById('botonCrearTarjeta');
        if (botonCrearTarjeta) {
            botonCrearTarjeta.addEventListener('click', crearTarjeta);
        }

        // --- Lógica del widget de Cloudinary ---
        // Funcion para mostrar el widget de subida de Cloudinary
        function mostrarWidgetDeSubida() {
            cloudinary.openUploadWidget(
                {
                    cloudName: "drve9qd5a", //
                    uploadPreset: "Protafolio-img" //
                },
                (error, result) => {
                    if (!error && result && result.info && result.info.secure_url) {
                        console.log('Imagen subida con éxito:', result.info.secure_url);
                        // Asigna la URL de la imagen subida al campo de input
                        document.getElementById('imageUrl').value = result.info.secure_url;
                    } else if (error) {
                        console.error('Error al subir la imagen:', error);
                    }
                }
            );
        }

        // Asociar la funcion mostrarWidgetDeSubida al boton "Subir Imagen"
        const botonSubirImagen = document.getElementById('botonSubirImagen');
        if (botonSubirImagen) {
            botonSubirImagen.addEventListener('click', mostrarWidgetDeSubida);
        }
        // --- Fin de la logica del widget de Cloudinary ---


    } catch (e) {
        console.error("Error en la carga inicial o al obtener las tarjetas: ", e);
    }
});