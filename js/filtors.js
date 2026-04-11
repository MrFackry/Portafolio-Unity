// js/filtros.js
function inicializarFiltros() {
    const botones = document.querySelectorAll('.categoria-btn');
    const contenedor = document.getElementById('contenedorTarjetasProyectos');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            botones.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            const categoriaSeleccionada = boton.dataset.categoria;
            const cards = contenedor.querySelectorAll('.cards');

            // Quitar mensaje previo si existe
            const mensajePrevio = contenedor.querySelector('.sin-resultados');
            if (mensajePrevio) mensajePrevio.remove();

            let visibles = 0;
            cards.forEach(card => {
                if (categoriaSeleccionada === 'todos') {
                    card.style.display = 'flex';
                    visibles++;
                } else {
                    const coincide = card.dataset.categoria === categoriaSeleccionada;
                    card.style.display = coincide ? 'flex' : 'none';
                    if (coincide) visibles++;
                }
            });

            // Mostrar mensaje si no hay resultados
            if (visibles === 0) {
                const mensaje = document.createElement('p');
                mensaje.classList.add('sin-resultados');
                mensaje.textContent = `No hay proyectos de ${categoriaSeleccionada} todavía.`;
                contenedor.appendChild(mensaje);
            }
        });
    });
}

export { inicializarFiltros };