document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos de la Galería y del Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('custom-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxText = document.getElementById('lightbox-text');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    // Botones de control
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    
    let currentIndex = 0;
    const totalItems = galleryItems.length;

    // --- FUNCIÓN CENTRAL: ACTUALIZAR CONTENIDO DEL MODAL ---
    function updateLightbox(index) {
        const item = galleryItems[index];
        if (!item) return;

        const imgElem = item.querySelector('img');
        const descElem = item.querySelector('.item-info p');
        
        // Control de seguridad por si el elemento no se ha cargado en el DOM
        if (!imgElem || !descElem) return;

        // Extrae imagen y texto del contenedor seleccionado
        const imgSrc = imgElem.getAttribute('src');
        const imgAlt = imgElem.getAttribute('alt');
        const description = descElem.textContent;

        // Actualiza la interfaz del Lightbox
        lightboxImg.setAttribute('src', imgSrc);
        lightboxImg.setAttribute('alt', imgAlt);
        lightboxText.textContent = description;
        lightboxCounter.textContent = `${index + 1} / ${totalItems}`;
        
        // Sincroniza el índice global
        currentIndex = index;
    }

    // --- ENTRADA: CLIC EN UN CONTENEDOR DE IMAGEN ---
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'), 10);
            updateLightbox(index);
            lightbox.classList.add('active'); // Muestra el modal
            document.body.style.overflow = 'hidden'; // Bloquea scroll de fondo
        });
    });

    // --- CONTROLES DE DESPLAZAMIENTO (FOTO POR FOTO) ---
    function showNext() {
        let newIndex = currentIndex + 1;
        if (newIndex >= totalItems) newIndex = 0;
        updateLightbox(newIndex);
    }

    function showPrev() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = totalItems - 1;
        updateLightbox(newIndex);
    }

    // Eventos de los botones de flecha
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });
    }

    // --- SALIDA: CERRAR EL MODAL ---
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Devuelve el scroll normal
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    // Cerrar haciendo clic en la zona oscura exterior
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // --- SOPORTE DE TECLADO ---
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});