// js/proyectos.js
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { tarjetasCollection } from './fireBase.js';

// Funcion para crear una tarjeta y guardarla en Firestore
async function crearTarjeta() {
    //datos del formulario para crear la tarjeta
    const imageUrl = document.getElementById('imageUrl').value;
    const rolText = document.getElementById('rolText').value;
    const linkUrl = document.getElementById('linkUrl').value;
    const buttonText = document.getElementById('buttonText').value;
    const tipoTarjeta = document.getElementById('tipoTarjeta').value;
    const categoria = document.getElementById('categoria').value;
    const contenedorId = tipoTarjeta === 'proyectos'
        ? 'contenedorTarjetasProyectos'
        : 'contenedorTarjetasPrototipos';
    const contenedor = document.getElementById(contenedorId);

    if (!imageUrl) {
        console.error("Por favor, ingresa la URL de la imagen.");
        return;
    }
    // Crea un objeto con los datos de la tarjeta
    const tarjetaData = {
        imageUrl,
        rolText,
        linkUrl,
        buttonText,
        categoria,
        tipoTarjeta,
        timestamp: new Date()
    };
    // Guarda la tarjeta en Firestore
    try {
        const docRef = await addDoc(tarjetasCollection, tarjetaData);
        console.log("Tarjeta agregada con ID: ", docRef.id);
        crearTarjetaEnDOM(tarjetaData, contenedor);
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

    const categoriaBadge = document.createElement('span');
    categoriaBadge.classList.add('badge-categoria');
    categoriaBadge.textContent = data.categoria || 'Unity';

    const imgCardDiv = document.createElement('div');
    imgCardDiv.classList.add('img-card');
    const img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = data.rolText;
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
    enlaceA.target = "_blank";

    
    infoCardDiv.appendChild(rolP);
    infoCardDiv.appendChild(rolesP);
    infoCardDiv.appendChild(enlaceA);
    infoCardDiv.appendChild(categoriaBadge);
    cardDiv.appendChild(imgCardDiv);
    cardDiv.appendChild(infoCardDiv);
    contenedor.appendChild(cardDiv);
}

export { crearTarjeta, crearTarjetaEnDOM };