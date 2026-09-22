document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. CONFIGURACIÓN DEL CATÁLOGO DINÁMICO (JSON)
    // ==========================================
    const contenedor = document.getElementById('gabinete-grid') || document.getElementById('catalogo-container');

    const cargarMonedas = () => {
        if (!contenedor) return; 

        console.log("Cargando catálogo desde JSON...");
        fetch('assets/data/monedas.json')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar JSON');
                return response.json();
            })
            .then(data => {
                contenedor.innerHTML = ''; 

                data.forEach(moneda => {
                    const card = document.createElement('div');
                    card.className = contenedor.id === 'gabinete-grid' ? 'moneda-card' : 'card';

                    card.innerHTML = `
                        <img src="${moneda.imagen}" alt="${moneda.nombre}">
                        <h4>${moneda.nombre} (${moneda.año || 'Colonial'})</h4>
                        <div>
                            <span class="moneda-precio">${moneda.precio || 'Consultar'}</span>
                            <span class="iva-incluido">IVA INCLUIDO</span>
                        </div>
                        <a href="#" class="btn-ver-detalle">Ver Detalles</a>
                    `;
                    contenedor.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                contenedor.innerHTML = '<p>No se pudieron cargar las piezas del gabinete.</p>';
            });
    };

    if (contenedor && !document.querySelector('.tab-content')) {
        cargarMonedas();
    }

    // ==========================================
    // 2. LÓGICA DE PESTAÑAS (TABS) INTERNAS
    // ==========================================
    window.openTab = function(evt, tabName) {
        const contents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < contents.length; i++) {
            contents[i].style.display = "none";
            contents[i].classList.remove("active");
        }

        const buttons = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.style.display = "block";
            targetTab.classList.add("active");
        }
        if (evt) evt.currentTarget.classList.add("active");

        if (tabName === 'catalogo') {
            cargarMonedas();
        }
    };

    const tabInicio = document.getElementById('inicio');
    if (tabInicio) tabInicio.style.display = 'block';

    // ==========================================
    // 3. VISOR MODAL DE IMÁGENES (SEGURO Y DELEGADO)
    // ==========================================
    const modal = document.getElementById('modal-visor');
    const imgModal = document.getElementById('img-modal-ampliada');
    const captionText = document.getElementById('modal-caption');

    // Delegación global de clics para imágenes ampliables
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('img-ampliable')) {
            if (!modal) return;
            modal.style.display = 'block';
            if (imgModal) imgModal.src = e.target.src;
            if (captionText) captionText.innerHTML = e.target.alt || '';
            document.body.style.overflow = 'hidden';
        }

        if (e.target.classList.contains('modal-cerrar') || e.target === modal) {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ==========================================
    // 4. DELEGACIÓN GLOBAL PARA MODALES DE PERFIL (FOOTER E INTRO)
    // ==========================================
    document.addEventListener("click", function (e) {
        
        // Abrir perfil de Bernardo Oliva
        const openBernardoBtn = e.target.closest("#open-bernardo") || e.target.closest("#open-bernardo-intro");
        if (openBernardoBtn) {
            e.preventDefault();
            e.stopPropagation(); // Detiene la redirección del splash/intro
            const bernardoModal = document.getElementById("bernardo-modal");
            if (bernardoModal) {
                bernardoModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        }

        // Abrir perfil de Carlos Urdaneta
        const openDevBtn = e.target.closest("#open-developer") || e.target.closest("#open-developer-intro");
        if (openDevBtn) {
            e.preventDefault();
            e.stopPropagation(); // Detiene la redirección del splash/intro
            const devModal = document.getElementById("profile-modal");
            if (devModal) {
                devModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        }

        // Abrir Submodal Trayectoria
        const openTrayectoriaBtn = e.target.closest("#open-trayectoria");
        if (openTrayectoriaBtn) {
            e.preventDefault();
            e.stopPropagation();
            const trayectoriaModal = document.getElementById("trayectoria-modal");
            if (trayectoriaModal) {
                trayectoriaModal.classList.add("active");
            }
        }

        // Cerrar Modales (Botón X)
        const closeBtn = e.target.closest(".p-modal-close");
        if (closeBtn) {
            const modalActivo = closeBtn.closest(".p-modal-overlay");
            if (modalActivo) {
                modalActivo.classList.remove("active");
                if (!document.querySelector(".p-modal-overlay.active")) {
                    document.body.style.overflow = "";
                }
            }
        }

        // Cerrar al hacer clic en el fondo oscuro translúcido
        if (e.target.classList.contains("p-modal-overlay")) {
            e.target.classList.remove("active");
            if (!document.querySelector(".p-modal-overlay.active")) {
                document.body.style.overflow = "";
            }
        }
    });

});