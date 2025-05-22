function crearTarjeta() {
            const imageUrl = document.getElementById('imageUrl').value;
            const rolText = document.getElementById('rolText').value;
            const descripcionText = document.getElementById('descripcionText').value;
            const linkUrl = document.getElementById('linkUrl').value;
            const buttonText = document.getElementById('buttonText').value;
            const tipoTarjeta = document.getElementById('tipoTarjeta').value;
            const contenedorTarjetasId = (tipoTarjeta === 'proyectos') ? 'contenedorTarjetasProyectos' : 'contenedorTarjetasPrototipos';
            const contenedorTarjetas = document.getElementById(contenedorTarjetasId);

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('cards');
            cardDiv.setAttribute('data-aos', 'fade-up');

            const imgCardDiv = document.createElement('div');
            imgCardDiv.classList.add('img-card');
            const img = document.createElement('img');
            img.id = 'img';
            img.src = imageUrl;
            img.alt = '';
            imgCardDiv.appendChild(img);

            const infoCardDiv = document.createElement('div');
            infoCardDiv.classList.add('info-card');
            const rolP = document.createElement('p');
            rolP.id = 'rol';
            rolP.textContent = 'Rol:';
            const rolesP = document.createElement('p');
            rolesP.id = 'roles';
            rolesP.textContent = rolText;
            const descripcionP = document.createElement('p');
            descripcionP.id = 'descripcion';
            descripcionP.textContent = descripcionText;
            const enlaceA = document.createElement('a');
            enlaceA.href = linkUrl;
            enlaceA.classList.add('button');
            enlaceA.textContent = buttonText;

            infoCardDiv.appendChild(rolP);
            infoCardDiv.appendChild(rolesP);
            infoCardDiv.appendChild(descripcionP);
            infoCardDiv.appendChild(enlaceA);

            cardDiv.appendChild(imgCardDiv);
            cardDiv.appendChild(infoCardDiv);

            contenedorTarjetas.appendChild(cardDiv);

            document.getElementById('cardForm').reset();
        }