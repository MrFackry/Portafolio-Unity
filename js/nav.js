document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    // Selecciona solo las secciones que tienen un ID correspondiente a los href de los enlaces
    const sections = document.querySelectorAll('#hero, #proyectos, #prototipos, #sobre-mi, #contacto');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    function setActiveLink() {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
        if (scrollY < sections[0].offsetTop - navbarHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const firstLink = document.querySelector(`.nav-link[href="#${sections[0].getAttribute('id')}"]`);
            if (firstLink && sections.length > 0 && scrollY < sections[0].offsetHeight) { // Activa el primer enlace al inicio (hero)
                firstLink.classList.add('active');
            }
        } else if (scrollY >= document.documentElement.scrollHeight - window.innerHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const lastSectionId = sections[sections.length - 1].getAttribute('id');
            const lastLink = document.querySelector(`.nav-link[href="#${lastSectionId}"]`);
            if (lastLink) {
                lastLink.classList.add('active'); // Activa el ultimo enlace al final (contacto)
            }
        }
    }

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
});