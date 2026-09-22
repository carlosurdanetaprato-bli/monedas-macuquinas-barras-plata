document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INYECCIÓN AUTOMÁTICA DEL MENÚ ---
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        fetch('./menu.html')
            .then(response => response.ok ? response.text() : Promise.reject('Error menú'))
            .then(data => {
                menuContainer.innerHTML = data;
                setMainActiveTab();
            })
            .catch(err => console.error(err));
    }

    // --- 2. INYECCIÓN AUTOMÁTICA DEL FOOTER ---
    const footerContainer = document.querySelector('footer');
    if (footerContainer) {
        fetch('./footer.html')
            .then(response => response.ok ? response.text() : Promise.reject('Error footer'))
            .then(data => {
                footerContainer.innerHTML = data;
                iniciarContadorVisitas();

                const devBtn = document.getElementById('open-developer');
                const profileModal = document.getElementById('profile-modal');
                const profileClose = document.querySelector('.p-modal-close');

                if (devBtn && profileModal) {
                    devBtn.addEventListener('click', () => {
                        profileModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });

                    if (profileClose) {
                        profileClose.addEventListener('click', () => {
                            profileModal.classList.remove('active');
                            document.body.style.overflow = '';
                        });
                    }

                    profileModal.addEventListener('click', (e) => {
                        if (e.target === profileModal) {
                            profileModal.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    });
                }
            })
            .catch(err => console.error(err));
    }

    // --- 3. PREPARACIÓN E INYECCIÓN DE LAS BARRAS FLOTANTES CON TÍTULOS ---
    let contenedorDinamico = document.getElementById("conversor-flotante-dinamico");

    if (contenedorDinamico) {
        const barraPlataExistente = contenedorDinamico.querySelector(".plata-floating-bar");
        const barraOroExistente = contenedorDinamico.querySelector(".oro-floating-bar");
        const barraPastaOroExistente = contenedorDinamico.querySelector(".pasta-oro-floating-bar");
        const barraPastaMonedaExistente = contenedorDinamico.querySelector(".pasta-moneda-floating-bar");
        const barraQuintaExistente = contenedorDinamico.querySelector(".quinta-floating-bar");

        if (barraPlataExistente) configurarEnlacesBarra(barraPlataExistente, 'plata');
        if (barraOroExistente) configurarEnlacesBarra(barraOroExistente, 'oro');
        if (barraPastaOroExistente) configurarEnlacesBarra(barraPastaOroExistente, 'pasta_oro');
        if (barraPastaMonedaExistente) configurarEnlacesBarra(barraPastaMonedaExistente, 'pasta_moneda');
        if (barraQuintaExistente) configurarEnlacesBarra(barraQuintaExistente, 'quinta_barra');

        // Cargar dinámicamente las barras faltantes
        if (!barraPlataExistente || !barraOroExistente || !barraPastaOroExistente || !barraPastaMonedaExistente || !barraQuintaExistente) {
            Promise.all([
                fetch('conversor.html').then(r => r.ok ? r.text() : '').catch(() => ''),
                fetch('conversor_oro_bar.html').then(r => r.ok ? r.text() : '').catch(() => ''),
                fetch('conversor_oro_pasta.html').then(r => r.ok ? r.text() : '').catch(() => ''),
                fetch('conversor_pasta.html').then(r => r.ok ? r.text() : '').catch(() => ''),
                fetch('conversor_quinta.html').then(r => r.ok ? r.text() : '').catch(() => '')
            ])
            .then(([htmlPlata, htmlOro, htmlPastaOro, htmlPastaMoneda, htmlQuinta]) => {
                const parser = new DOMParser();

                // 1. Inyectar Barra Plata con Título
                if (!barraPlataExistente && htmlPlata) {
                    const doc = parser.parseFromString(htmlPlata, 'text/html');
                    const barra = doc.querySelector(".macuquina-floating-bar, div");
                    if (barra) {
                        const clon = barra.cloneNode(true);
                        clon.classList.add("plata-floating-bar");
                        configurarEnlacesBarra(clon, 'plata');

                        const tituloPlata = document.createElement("h4");
                        tituloPlata.className = "subtitulo-menu-barra";
                        tituloPlata.textContent = "Conversor de Plata a Unidades Métricas";

                        contenedorDinamico.appendChild(tituloPlata);
                        contenedorDinamico.appendChild(clon);
                    }
                }

                // 2. Inyectar Barra Oro con Título
                if (!barraOroExistente && htmlOro) {
                    const doc = parser.parseFromString(htmlOro, 'text/html');
                    const barra = doc.querySelector(".macuquina-floating-bar, div");
                    if (barra) {
                        const clon = barra.cloneNode(true);
                        clon.classList.add("oro-floating-bar");
                        configurarEnlacesBarra(clon, 'oro');

                        const tituloOro = document.createElement("h4");
                        tituloOro.className = "subtitulo-menu-barra";
                        tituloOro.textContent = "Conversor de Oro a Unidades Métricas";

                        contenedorDinamico.appendChild(tituloOro);
                        contenedorDinamico.appendChild(clon);
                    }
                }

                // 3. Inyectar Barra Pasta de Oro con Título
                if (!barraPastaOroExistente && htmlPastaOro) {
                    const doc = parser.parseFromString(htmlPastaOro, 'text/html');
                    const barra = doc.querySelector(".macuquina-floating-bar, div");
                    if (barra) {
                        const clon = barra.cloneNode(true);
                        clon.classList.add("pasta-oro-floating-bar");
                        configurarEnlacesBarra(clon, 'pasta_oro');

                        const tituloPastaOro = document.createElement("h4");
                        tituloPastaOro.className = "subtitulo-menu-barra";
                        tituloPastaOro.textContent = "Conversor de Lingotes a Monedas";

                        contenedorDinamico.appendChild(tituloPastaOro);
                        contenedorDinamico.appendChild(clon);
                    }
                }

                // 4. Inyectar Barra Pasta Monedas (Pragmáticas) con Título
                if (!barraPastaMonedaExistente && htmlPastaMoneda) {
                    const doc = parser.parseFromString(htmlPastaMoneda, 'text/html');
                    const barra = doc.querySelector(".macuquina-floating-bar, div");
                    if (barra) {
                        const clon = barra.cloneNode(true);
                        clon.classList.add("pasta-moneda-floating-bar");
                        configurarEnlacesBarra(clon, 'pasta_moneda');

                        const tituloPastaMoneda = document.createElement("h4");
                        tituloPastaMoneda.className = "subtitulo-menu-barra";
                        tituloPastaMoneda.textContent = "Conversor/Pasta -> Monedas (Pragmáticas Secretas)";

                        contenedorDinamico.appendChild(tituloPastaMoneda);
                        contenedorDinamico.appendChild(clon);
                    }
                }

                // 5. Inyectar Quinta Barra con Título (Ley Monetaria  Reforma Borbónica)
                if (!barraQuintaExistente && htmlQuinta) {
                    const doc = parser.parseFromString(htmlQuinta, 'text/html');
                    const barra = doc.querySelector(".macuquina-floating-bar, div");
                    if (barra) {
                        const clon = barra.cloneNode(true);
                        clon.classList.add("quinta-floating-bar");
                        configurarEnlacesBarra(clon, 'quinta_barra');

                        const tituloQuinta = document.createElement("h4");
                        tituloQuinta.className = "subtitulo-menu-barra";
                        tituloQuinta.textContent = "CONVERSOR DE BARRAS A MONEDAS PRAGMATICA MEDINA-BORBONICA";

                        contenedorDinamico.appendChild(tituloQuinta);
                        contenedorDinamico.appendChild(clon);
                    }
                }
            })
            .catch(err => console.error("Error al cargar barras dinámicas:", err));
        }
    }

});

/* ==========================================================================
   CONFIGURACIÓN DE BARRAS Y ENLACES (Manejador de clics en íconos)
   ========================================================================= */
function configurarEnlacesBarra(barraElemento, tipo) {
    if (!barraElemento) return;

    // Detectar si es la quinta barra (Pragmática Medina del Campo / Borbónica)
    const esQuintaBarra = (tipo === 'quinta_barra') || 
                          barraElemento.classList.contains("quinta-floating-bar") ||
                          barraElemento.previousElementSibling?.textContent.includes("MEDINA-BORBONICA");

    const esPastaMoneda = (tipo === 'pasta_moneda') || 
                          barraElemento.classList.contains("pasta-moneda-floating-bar") ||
                          barraElemento.classList.contains("pasta-monedas-floating-bar");

    const esBarraPastaOro = (tipo === 'pasta_oro') || barraElemento.classList.contains("pasta-oro-floating-bar");
    const esBarraOro = (tipo === 'oro') || barraElemento.classList.contains("oro-floating-bar");

    const botones = barraElemento.querySelectorAll("button, .macuquina-icon-btn");

    botones.forEach((btn, index) => {
        // Clonar el botón para eliminar cualquier event listener previo acumulado
        const btnNuevo = btn.cloneNode(true);
        btn.parentNode.replaceChild(btnNuevo, btn);

        btnNuevo.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (esQuintaBarra) {
                if (index === 0) {
                    // Primer Botón: Pragmática de Medina del Campo -> conversor4.html
                    cargarModalDesdeArchivo('conversor4.html', 'pasta_reales_prag');
                } else if (index === 1) {
                    // Segundo Botón: Ley Monetaria Borbónica -> conversor3.html
                    cargarModalDesdeArchivo('conversor3.html', 'pasta_reales');
                }
            } else if (esPastaMoneda) {
                switch (index) {
                    case 0: cargarModalDesdeArchivo('conversor-pragmatica-72-86.html', 'pasta_oro_1772'); break;
                    case 1: cargarModalDesdeArchivo('conversor-pragmatica-86.html', 'pasta_oro_1786'); break;
                    case 2: cargarModalDesdeArchivo('conversor-pragmatica-72.html', 'pasta_plata_1772'); break;
                }
            } else if (esBarraPastaOro) {
                switch (index) {
                    case 0: cargarModalDesdeArchivo('conversor_oro_pasta1.html', 'pasta_oro_pre'); break;
                    case 1: cargarModalDesdeArchivo('conversor_oro_pasta2.html', 'pasta_oro_post'); break;
                }
            } else if (esBarraOro) {
                switch (index) {
                    case 0: cargarModalDesdeArchivo('conversor_oro.html', 'oro_pre_felipe'); break;
                    case 1: cargarModalDesdeArchivo('conversor_oro1.html', 'fineza_oro'); break;
                    case 2: cargarModalDesdeArchivo('conversor_oro2.html', 'grano_ley_oro'); break;
                    case 3: cargarModalDesdeArchivo('conversor3.html', 'pasta_reales'); break;
                }
            } else {
                switch (index) {
                    case 0: cargarModalDesdeArchivo('conversor.html', 'pesos'); break;
                    case 1: cargarModalDesdeArchivo('conversor1.html', 'fineza'); break;
                    case 2: cargarModalDesdeArchivo('conversor2.html', 'grano_ley'); break;
                    case 3: cargarModalDesdeArchivo('conversor3.html', 'pasta_reales'); break;
                }
            }
        });
    });
}

/* ==========================================================================
   CARGA DINÁMICA DE ARCHIVOS HTML E INYECCIÓN EN MODAL
   ========================================================================= */
function cargarModalDesdeArchivo(archivoHtml, tipoModal) {
    fetch(archivoHtml)
        .then(response => {
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return response.text();
        })
        .then(html => {
            let contenedorModal = document.getElementById('modal-container');
            if (!contenedorModal) {
                contenedorModal = document.createElement('div');
                contenedorModal.id = 'modal-container';
                document.body.appendChild(contenedorModal);
            }

            contenedorModal.innerHTML = html;

            let modal = null;
            if (tipoModal === 'pasta_reales_prag') {
                modal = document.getElementById('modal-pasta-reales-pragmatica');
            } else if (tipoModal === 'pasta_reales') {
                modal = document.getElementById('modal-pasta-reales');
            } else {
                modal = contenedorModal.querySelector('.macuquina-modal-overlay, .modal, .modal-conversor');
            }

            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Si se carga el conversor 4, se inicializan los cálculos automáticamente
                if (tipoModal === 'pasta_reales_prag') {
                    calcularPastaARealesPragmatica();
                }
            }
        })
        .catch(err => console.error("Error al cargar la ventana modal:", err));
}




/* ==========================================================================
   CÁLCULOS Y LIMPIEZA DE CONVERSOR 4 (PRAGMÁTICA DE MEDINA DEL CAMPO)
   ========================================================================= */

// Validación de límites máximos según inputs
function validarLimite(input) {
    if (input.max && parseFloat(input.value) > parseFloat(input.max)) {
        input.value = input.max;
    }
    if (input.value < 0) {
        input.value = 0;
    }
}

// Función principal de cálculo para conversor4.html
function calcularPastaARealesPragmatica() {
    // Obtención de valores de entradas (Peso)
    const marcos = parseFloat(document.getElementById('pasta-marcos-prag')?.value) || 0;
    const onzas = parseFloat(document.getElementById('pasta-onzas-prag')?.value) || 0;
    const ochavas = parseFloat(document.getElementById('pasta-ochavas-prag')?.value) || 0;
    const tomines = parseFloat(document.getElementById('pasta-tomines-prag')?.value) || 0;
    const granos = parseFloat(document.getElementById('pasta-granos-prag')?.value) || 0;

    // Obtención de valores de entradas (Fineza)
    const dineros = parseFloat(document.getElementById('pasta-dineros-prag')?.value) || 0;
    const granosLey = parseFloat(document.getElementById('pasta-granos-ley-prag')?.value) || 0;

    // 1. Cálculos de equivalencias parciales en granos
    const gMarcos = marcos * 4608;
    const gOnzas = onzas * 576;
    const gOchavas = ochavas * 72;
    const gTomines = tomines * 12;
    const gGranos = granos * 1;
    const totalGranosPeso = gMarcos + gOnzas + gOchavas + gTomines + gGranos;

    // Actualización de cajas individuales de granos (Sección 1)
    if (document.getElementById('res-pasta-marcos-prag')) document.getElementById('res-pasta-marcos-prag').textContent = `${gMarcos} granos`;
    if (document.getElementById('res-pasta-onzas-prag')) document.getElementById('res-pasta-onzas-prag').textContent = `${gOnzas} granos`;
    if (document.getElementById('res-pasta-ochavas-prag')) document.getElementById('res-pasta-ochavas-prag').textContent = `${gOchavas} granos`;
    if (document.getElementById('res-pasta-tomines-prag')) document.getElementById('res-pasta-tomines-prag').textContent = `${gTomines} granos`;
    if (document.getElementById('res-pasta-granos-prag')) document.getElementById('res-pasta-granos-prag').textContent = `${gGranos} granos`;

    // 2. Fineza (Dineros y Granos de Ley)
    const gDineros = dineros * 24;
    const totalGranosLeyUnidad = gDineros + granosLey;

    if (document.getElementById('res-pasta-dineros-prag')) document.getElementById('res-pasta-dineros-prag').textContent = `${gDineros} granos`;
    if (document.getElementById('res-pasta-granos-ley-prag')) document.getElementById('res-pasta-granos-ley-prag').textContent = `${totalGranosLeyUnidad} granos`;

    // 3. Totales generales
    const totalMarcos = totalGranosPeso / 4608;
    const marcosMonetarios = (totalGranosPeso * totalGranosLeyUnidad) / (4608 * 288);
    
    // De acuerdo a la Pragmática de Medina del Campo: 67 Reales por Marco de Plata de ley (11 dineros 4 granos)
    const totalReales = totalMarcos * (totalGranosLeyUnidad / 288) * 67;
    
    const pesosEnteros = Math.floor(totalReales / 8);
    const realesRestantes = (totalReales % 8).toFixed(2);

    // Renderizado en tarjeta de resultados
    if (document.getElementById('res-total-marcos-prag')) {
        document.getElementById('res-total-marcos-prag').textContent = `${totalMarcos.toFixed(4)} Marcos`;
    }
    if (document.getElementById('res-total-granos-ley-prag')) {
        document.getElementById('res-total-granos-ley-prag').textContent = `${totalGranosLeyUnidad} Granos`;
    }
    if (document.getElementById('res-marcos-rieles-prag')) {
        document.getElementById('res-marcos-rieles-prag').textContent = `${marcosMonetarios.toFixed(4)} Marcos`;
    }
    if (document.getElementById('res-total-reales-prag')) {
        document.getElementById('res-total-reales-prag').textContent = `${totalReales.toFixed(2)} Reales`;
    }
    if (document.getElementById('res-total-pesos-prag')) {
        document.getElementById('res-total-pesos-prag').textContent = `${pesosEnteros} Pesos ${realesRestantes} Reales`;
    }
}

// Restablecer campos del conversor 4
function limpiarPastaARealesPragmatica() {
    const ids = [
        'pasta-marcos-prag', 'pasta-onzas-prag', 'pasta-ochavas-prag', 
        'pasta-tomines-prag', 'pasta-granos-prag', 'pasta-dineros-prag', 
        'pasta-granos-ley-prag'
    ];
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    calcularPastaARealesPragmatica();
}

/* ==========================================================================
   CIERRE DE MODAL
   ========================================================================= */
function closeModalPesos() {
    const modales = document.querySelectorAll('#modal-container .macuquina-modal-overlay, #modal-pasta-reales-pragmatica, #modal-pasta-reales');
    modales.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}
/* ==========================================================================
   DECLARACIÓN GLOBAL DE FUNCIONES DE PRAGMÁTICAS
   ========================================================================= */
window.abrirModalOro1772 = function() {
    cargarModalDesdeArchivo('conversor-pragmatica-72-86.html', 'pasta_oro_1772');
};

window.abrirModalOro1786 = function() {
    cargarModalDesdeArchivo('conversor-pragmatica-86.html', 'pasta_oro_1786');
};

window.abrirModalPlata1772 = function() {
    cargarModalDesdeArchivo('conversor-pragmatica-72.html', 'pasta_plata_1772');
};

/* ==========================================================================
   APERTURA, CIERRE Y CARGADOR DINÁMICO SPA (PROTEGIENDO EL MENÚ PRINCIPAL)
   ========================================================================= */

function openModalOro() {
  limpiarModalesCalculoActivos();
  cargarModalDesdeArchivo('conversor_oro.html', 'oro_pre_felipe');
}

function openModalPesos() {
  limpiarModalesCalculoActivos();
  cargarModalDesdeArchivo('conversor.html', 'pesos');
}

function closeModalOro() {
  closeModalPesos();
}

// ÚNICA DEFINICIÓN DE CLOSE MODAL PESOS
function closeModalPesos() {
  // 1. Remueve de forma precisa el modal de cálculo activo
  limpiarModalesCalculoActivos();
  
  // 2. Restaura la visibilidad y funcionalidad del menú principal
  const menuWrapper = document.getElementById('modal-conversores-wrapper');
  if (menuWrapper) {
    menuWrapper.style.display = 'flex';
    menuWrapper.classList.add('open', 'active');
    menuWrapper.style.pointerEvents = 'auto'; // Reconstruye interacción del mouse
  }

  document.body.style.overflow = "hidden";
}

function closeModalPesosOuter(event) {
  // Ignora si el clic fue dentro del contenedor del menú principal
  if (event.target.id === 'modal-conversores-wrapper') return;

  if (event.target.classList.contains("conversor-secundario-modal") ||
      event.target.id === "modal-calculo-activo" ||
      event.target.id === "modal-pesos-virreinales" ||
      event.target.id === "modal-pasta-reales") {
    closeModalPesos();
  }
}

function cargarModalDesdeArchivo(archivoHTML, modo) {
  window.modoConversorActual = modo;
  
  fetch(archivoHTML + '?v=' + new Date().getTime())
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar: ' + archivoHTML);
      return response.text();
    })
    .then(htmlTexto => {
      const parser = new DOMParser();
      const docTemporal = parser.parseFromString(htmlTexto, 'text/html');
      
      const nuevoModalHtml = docTemporal.querySelector('#modal-pasta-reales, #modal-pesos-virreinales, .macuquina-modal-overlay, .macuquina-modal');
      
      if (nuevoModalHtml) {
        limpiarModalesCalculoActivos();
        
        // Oculta el menú principal pero NO toca sus eventos ni lo borra
        const menuWrapper = document.getElementById('modal-conversores-wrapper');
        if (menuWrapper) {
          menuWrapper.style.display = 'none';
        }

        // Inyecta el modal de cálculo activo
        const clon = nuevoModalHtml.cloneNode(true);
        clon.setAttribute('id', 'modal-calculo-activo');
        clon.classList.add('conversor-secundario-modal'); // Identificador único de seguridad
        
        const contenedorDinamico = document.getElementById("conversor-flotante-dinamico") || document.body;
        contenedorDinamico.appendChild(clon);
        
        mostrarModalEnPantalla();

        if (modo === 'pasta_reales') {
          if (typeof limpiarPastaAReales === 'function') {
            limpiarPastaAReales();
          } else if (typeof calcularPastaAReales === 'function') {
            calcularPastaAReales();
          }
        }
      } else {
        console.warn("No se encontró contenedor modal en:", archivoHTML);
      }
    })
    .catch(err => console.error("Error al cargar modal:", err));
}

function mostrarModalEnPantalla() {
  const modalCalculo = document.getElementById('modal-calculo-activo');
  if (modalCalculo) {
    modalCalculo.style.display = "flex";
    modalCalculo.classList.add("open", "active");
    document.body.style.overflow = "hidden";
  }
}

// LIMPIEZA SEGURA: NUNCA TOCA EL WRAPPER DEL MENÚ
function limpiarModalesCalculoActivos() {
  const modalActivo = document.getElementById('modal-calculo-activo');
  if (modalActivo) {
    modalActivo.remove();
  }
  
  // Elimina cualquier residuo dinámico EXCLUYENDO explícitamente el Wrapper
  const modalesViejos = document.querySelectorAll('.conversor-secundario-modal');
  modalesViejos.forEach(m => m.remove());
}
/* ==========================================================================
   LÓGICA MATEMÁTICA Y NORMAS PARA EL ORO (PRE-FELIPE V)
   ========================================================================= */

const factoresOroPreFelipe = { 
  marco: 230.0465, 
  castellano: 4.60093, 
  tomin: 0.5751, 
  grano: 0.04792,
  quilates: 41.6667,
  granos: 10.4167,
  granoley: 10.4167
};

function calcularModalOro(unidadModificada) {
  if (!window.modoConversorActual || !window.modoConversorActual.startsWith("oro")) {
    window.modoConversorActual = "oro_pre_felipe";
  }

  const inputUnidad = document.getElementById(`mod-${unidadModificada}`);
  const resBoxUnidad = document.getElementById(`res-mod-${unidadModificada}`);
  const errorBox = document.getElementById(`error-mod-${unidadModificada}`);
  
  if (!inputUnidad || !resBoxUnidad) return;
  let valorUnidad = parseFloat(inputUnidad.value);

  if (!isNaN(valorUnidad) && valorUnidad < 0) {
    inputUnidad.value = 0;
    valorUnidad = 0;
  }

  if (errorBox) errorBox.innerText = "";

  if (unidadModificada === "castellano" && valorUnidad >= 50) {
    if (errorBox) errorBox.innerText = "⚠️ 50 castellanos es un marco";
  } else if (unidadModificada === "tomin" && valorUnidad >= 8) {
    if (errorBox) errorBox.innerText = "⚠️ 8 tomines es un castellano";
  } else if (unidadModificada === "grano" && valorUnidad >= 12) {
    if (errorBox) errorBox.innerText = "⚠️ 12 granos es un tomín";
  }

  const esMilesima = (unidadModificada === "quilates" || unidadModificada === "granos" || unidadModificada === "granoley");

  if (!isNaN(valorUnidad) && valorUnidad >= 0) {
    let resultado = valorUnidad * factoresOroPreFelipe[unidadModificada];
    if (esMilesima) {
      resBoxUnidad.innerText = resultado.toFixed(4) + " ‰";
    } else {
      resBoxUnidad.innerText = resultado >= 1000 
        ? (resultado / 1000).toFixed(4) + " kg" 
        : resultado.toFixed(4) + " g";
    }
    resBoxUnidad.style.color = "#222";
  } else {
    resBoxUnidad.innerText = esMilesima ? "0.0000 ‰" : "0.0000 g";
  }

  let granTotal = 0;
  for (const uni in factoresOroPreFelipe) {
    const inputEl = document.getElementById(`mod-${uni}`);
    if (inputEl) {
      let val = parseFloat(inputEl.value);
      if (!isNaN(val) && val >= 0) {
        granTotal += val * factoresOroPreFelipe[uni];
      }
    }
  }

  const totalBox = document.getElementById("res-mod-total");
  if (totalBox) {
    if (esMilesima) {
      totalBox.innerText = granTotal.toFixed(4) + " ‰";
      totalBox.style.color = "#b38f43";
    } else if (granTotal >= 1000) {
      totalBox.innerText = (granTotal / 1000).toFixed(4) + " kg";
      totalBox.style.color = "#1e4620";
    } else {
      totalBox.innerText = granTotal.toFixed(4) + " g";
      totalBox.style.color = "#b38f43";
    }
  }
}

/* ==========================================================================
   LÓGICA MATEMÁTICA PARA LA PLATA
   ========================================================================= */
const factoresPesos = { marco: 230.04650, onza: 28.75581, ochava: 3.59448, tomin: 0.59908, grano: 0.04992 };
const factoresFineza = { dinero: 83.33333, grano: 3.47222 };
const factoresGranoLey = { granoley: 3.47222 };

function calcularModal(unidadModificada) {
  const modo = window.modoConversorActual;
  const esFineza = (modo === "fineza");
  const esGranoLey = (modo === "grano_ley");
  
  let factoresActuales = factoresPesos;
  if (esFineza) factoresActuales = factoresFineza;
  else if (esGranoLey) factoresActuales = factoresGranoLey;

  const inputUnidad = document.getElementById(`mod-${unidadModificada}`);
  const resBoxUnidad = document.getElementById(`res-mod-${unidadModificada}`);
  
  if (!inputUnidad || !resBoxUnidad) return;
  let valorUnidad = parseFloat(inputUnidad.value);

  if (!isNaN(valorUnidad) && valorUnidad < 0) {
    inputUnidad.value = 0;
    valorUnidad = 0;
  }

  if (!isNaN(valorUnidad) && valorUnidad >= 0) {
    let resultado = valorUnidad * factoresActuales[unidadModificada];
    if (esFineza || esGranoLey) {
      resBoxUnidad.innerText = resultado.toFixed(4);
    } else {
      resBoxUnidad.innerText = resultado >= 1000 ? (resultado / 1000).toFixed(4) + " kg" : resultado.toFixed(4) + " g";
    }
  } else {
    resBoxUnidad.innerText = "0.0000" + ((esFineza || esGranoLey) ? "" : " g");
  }

  let granTotal = 0;
  for (const uni in factoresActuales) {
    const inputElement = document.getElementById(`mod-${uni}`);
    if (inputElement) {
      let inpVal = parseFloat(inputElement.value);
      if (!isNaN(inpVal) && inpVal >= 0) granTotal += inpVal * factoresActuales[uni];
    }
  }

  const totalBox = document.getElementById("res-mod-total");
  if (totalBox) {
    if (esFineza || esGranoLey) {
      totalBox.innerText = granTotal.toFixed(4) + " ‰";
    } else {
      totalBox.innerText = granTotal >= 1000 ? (granTotal / 1000).toFixed(4) + " kg" : granTotal.toFixed(4) + " g";
    }
  }
}

/* ==========================================================================
   LÓGICA ORO MASA Y FINEZA ORO 2
   ========================================================================= */

/* =========================================================
   1. CONVERSOR DE PESOS DE ORO VIRREINALES (MASA)
   ========================================================= */

function calcularModalOroMasa(origen) {
  const factores = {
    marco: 230.04650,
    onza: 28.75581,
    ochava: 3.59448,
    tomin: 0.59908,
    grano: 0.04992
  };

  // Reglas de límite con sus respectivos mensajes de error
  const reglas = {
    onza: { max: 8, msg: "8 onzas es un marco" },
    ochava: { max: 8, msg: "8 ochavas es una onza" },
    tomin: { max: 6, msg: "6 tomines es una ochava" },
    grano: { max: 12, msg: "12 granos es un tomín" }
  };

  let totalGramos = 0;

  for (const unidad in factores) {
    const input = document.getElementById(`mod-oro-${unidad}`);
    const resBox = document.getElementById(`res-mod-oro-${unidad}`);
    const errorBox = document.getElementById(`error-mod-oro-${unidad}`);

    if (!input || !resBox) continue;

    const valor = parseFloat(input.value) || 0;
    let esValido = true;

    // Validación de límites según las reglas virreinales
    if (reglas[unidad] && valor >= reglas[unidad].max) {
      if (errorBox) errorBox.textContent = reglas[unidad].msg;
      resBox.textContent = '0.0000 g';
      esValido = false; // Bloquea la suma de esta unidad al total
    } else {
      if (errorBox) errorBox.textContent = ''; // Limpia el mensaje si el valor es válido
    }

    // Si es un valor válido, calcula el subtotal y lo suma
    if (esValido && valor > 0) {
      const subtotal = valor * factores[unidad];
      resBox.textContent = subtotal.toFixed(4) + ' g';
      totalGramos += subtotal;
    } else if (esValido) {
      resBox.textContent = '0.0000 g';
    }
  }

  // Actualiza el resultado total de masa combinada
  const resTotal = document.getElementById('res-mod-oro-total');
  if (resTotal) resTotal.textContent = totalGramos.toFixed(4) + ' g';
}

function limpiarConversorOroMasa() {
  const unidades = ['marco', 'onza', 'ochava', 'tomin', 'grano'];
  
  unidades.forEach(u => {
    const inp = document.getElementById(`mod-oro-${u}`);
    const res = document.getElementById(`res-mod-oro-${u}`);
    const err = document.getElementById(`error-mod-oro-${u}`);
    
    if (inp) inp.value = '';
    if (res) res.textContent = '0.0000 g';
    if (err) err.textContent = ''; // Limpia las alertas rojas
  });

  const resTotal = document.getElementById('res-mod-oro-total');
  if (resTotal) resTotal.textContent = '0.0000 g';
}

/* =========================================================
   2. CONVERSOR DE FINEZA DE ORO (LEY)
   ========================================================= */

function calcularFinezaA() {
  const inputQ = document.getElementById('mod-f2-quilates');
  const inputG = document.getElementById('mod-f2-granos-a');
  
  const errQ = document.getElementById('error-f2-quilates');
  const errG = document.getElementById('error-f2-granos-a');
  
  const resQ = document.getElementById('res-f2-quilates');
  const resG = document.getElementById('res-f2-granos-a');
  const resTotalA = document.getElementById('res-f2-total-a');

  if (!inputQ || !inputG) return;

  let valQ = parseFloat(inputQ.value) || 0;
  let valG = parseFloat(inputG.value) || 0;
  let errorState = false;

  if (valQ >= 25) {
    if (errQ) errQ.textContent = 'Error: la máxima fineza es de 24 quilates';
    errorState = true;
  } else if (errQ) {
    errQ.textContent = '';
  }

  if (valG >= 4) {
    if (errG) errG.textContent = 'Error: 4 granos equivalen a 1 quilate';
    errorState = true;
  } else if (errG) {
    errG.textContent = '';
  }

  if (errorState) {
    if (resTotalA) resTotalA.textContent = 'Error';
    return;
  }

  const subQ = valQ * 41.6667;
  const subG = valG * 10.4167;
  const total = subQ + subG;

  if (resQ) resQ.textContent = subQ.toFixed(4) + ' ‰';
  if (resG) resG.textContent = subG.toFixed(4) + ' ‰';
  if (resTotalA) resTotalA.textContent = total.toFixed(4) + ' ‰';
}

function calcularFinezaB() {
  const inputG = document.getElementById('mod-f2-granos-b');
  const errG = document.getElementById('error-f2-granos-b');
  const resTotalB = document.getElementById('res-f2-total-b');

  if (!inputG) return;

  let valG = parseFloat(inputG.value) || 0;

  if (valG >= 97) {
    if (errG) errG.textContent = 'Error: la máxima fineza es de 96 granos';
    if (resTotalB) resTotalB.textContent = 'Error';
    return;
  } else if (errG) {
    errG.textContent = '';
  }

  const total = valG * 10.4167;
  if (resTotalB) resTotalB.textContent = total.toFixed(4) + ' ‰';
}

function limpiarConversorOro2() {
  const idsInputs = ['mod-f2-quilates', 'mod-f2-granos-a', 'mod-f2-granos-b'];
  const idsErrors = ['error-f2-quilates', 'error-f2-granos-a', 'error-f2-granos-b'];
  
  idsInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  idsErrors.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  if (document.getElementById('res-f2-quilates')) document.getElementById('res-f2-quilates').textContent = '0.0000 ‰';
  if (document.getElementById('res-f2-granos-a')) document.getElementById('res-f2-granos-a').textContent = '0.0000 ‰';
  if (document.getElementById('res-f2-total-a')) document.getElementById('res-f2-total-a').textContent = '0.0000 ‰';
  if (document.getElementById('res-f2-total-b')) document.getElementById('res-f2-total-b').textContent = '0.0000 ‰';
}

/* ==========================================================================
   VALIDADOR DE LÍMITES EN TIEMPO REAL
   ========================================================================= */
function validarLimite(input) {
  const max = parseFloat(input.getAttribute('max'));
  const min = parseFloat(input.getAttribute('min')) || 0;
  
  if (input.value === '') return;

  let valor = parseFloat(input.value);

  if (!isNaN(max) && valor > max) {
    input.value = max;
  } else if (valor < min) {
    input.value = min;
  }
}

/* ==========================================================================
   CÁLCULO DINÁMICO DE PASTA A REALES Y PESOS (PRAGMÁTICA DE MEDINA DEL CAMPO)
   ========================================================================= */
function calcularPastaARealesPragmatica() {
  const elMarcos = document.getElementById('pasta-marcos-prag');
  const elOnzas = document.getElementById('pasta-onzas-prag');
  const elOchavas = document.getElementById('pasta-ochavas-prag');
  const elTomines = document.getElementById('pasta-tomines-prag');
  const elGranos = document.getElementById('pasta-granos-prag');
  
  const elDineros = document.getElementById('pasta-dineros-prag');
  const elGranosLey = document.getElementById('pasta-granos-ley-prag');
  const elPeriodo = document.getElementById('periodo-reforma-prag');

  if (!elMarcos || !elPeriodo) return;

  const marcos = parseFloat(elMarcos.value) || 0;
  const onzas = parseFloat(elOnzas ? elOnzas.value : 0) || 0;
  const ochavas = parseFloat(elOchavas ? elOchavas.value : 0) || 0;
  const tomines = parseFloat(elTomines ? elTomines.value : 0) || 0;
  const granos = parseFloat(elGranos ? elGranos.value : 0) || 0;

  const dineros = parseFloat(elDineros ? elDineros.value : 0) || 0;
  const granosLey = parseFloat(elGranosLey ? elGranosLey.value : 0) || 0;

  // Advertencias de límites
  const wOnzas = document.getElementById('warn-pasta-onzas-prag');
  const wOchavas = document.getElementById('warn-pasta-ochavas-prag');
  const wTomines = document.getElementById('warn-pasta-tomines-prag');
  const wGranos = document.getElementById('warn-pasta-granos-prag');

  if (wOnzas)   wOnzas.innerText   = onzas >= 7   ? '(8 onzas es un marco)' : '';
  if (wOchavas) wOchavas.innerText = ochavas >= 7 ? '(8 ochavas es una onza)' : '';
  if (wTomines) wTomines.innerText = tomines >= 5 ? '(6 tomines es una ochava)' : '';
  if (wGranos)  wGranos.innerText  = granos >= 11 ? '(12 granos es un tomín)' : '';

  // Cálculos de peso
  const gMarcos = marcos * 4608;
  const gOnzas = onzas * 576;
  const gOchavas = ochavas * 72;
  const gTomines = tomines * 12;
  const gGranos = granos * 1;

  if (document.getElementById('res-pasta-marcos-prag')) document.getElementById('res-pasta-marcos-prag').innerText = `${gMarcos} granos`;
  if (document.getElementById('res-pasta-onzas-prag')) document.getElementById('res-pasta-onzas-prag').innerText = `${gOnzas} granos`;
  if (document.getElementById('res-pasta-ochavas-prag')) document.getElementById('res-pasta-ochavas-prag').innerText = `${gOchavas} granos`;
  if (document.getElementById('res-pasta-tomines-prag')) document.getElementById('res-pasta-tomines-prag').innerText = `${gTomines} granos`;
  if (document.getElementById('res-pasta-granos-prag')) document.getElementById('res-pasta-granos-prag').innerText = `${gGranos} granos`;

  // Cálculos de fineza
  const gDineros = dineros * 24;
  const gGranosLeyVal = granosLey * 1;
  const totalGranosLey = gDineros + gGranosLeyVal;

  if (document.getElementById('res-pasta-dineros-prag')) document.getElementById('res-pasta-dineros-prag').innerText = `${gDineros} granos`;
  if (document.getElementById('res-pasta-granos-ley-prag')) document.getElementById('res-pasta-granos-ley-prag').innerText = `${gGranosLeyVal} granos`;

  // Totales globales y conversión Pragmática
  const totalGranosPeso = gMarcos + gOnzas + gOchavas + gTomines + gGranos;
  const marcosTotales = totalGranosPeso / 4608;

  const esPreBorbonico = elPeriodo.value === 'pre';
  const divisorRieles = esPreBorbonico ? 268 : 264; // Fuerza 268
  
  const marcosEnRieles = totalGranosLey > 0 
    ? (marcosTotales * totalGranosLey) / divisorRieles 
    : 0;

  const multiplicadorReales = esPreBorbonico ? 67 : 68; // Fuerza 67
  const totalReales = marcosEnRieles * multiplicadorReales;
  
  const pesosEnteros = Math.floor(totalReales / 8);
  const realesRestantes = totalReales % 8;

  const strRealesRestantes = Number.isInteger(realesRestantes)
    ? realesRestantes
    : parseFloat(realesRestantes.toFixed(1));

  // Renderizado en la interfaz
  if (document.getElementById('res-total-marcos-prag')) document.getElementById('res-total-marcos-prag').innerText = `${marcosTotales.toFixed(4)} Marcos`;
  if (document.getElementById('res-total-granos-ley-prag')) document.getElementById('res-total-granos-ley-prag').innerText = `${totalGranosLey} Granos`;
  if (document.getElementById('res-marcos-rieles-prag')) document.getElementById('res-marcos-rieles-prag').innerText = `${marcosEnRieles.toFixed(6)} Marcos`;
  if (document.getElementById('res-total-reales-prag')) document.getElementById('res-total-reales-prag').innerText = `${totalReales.toFixed(2)} Reales`;
  if (document.getElementById('res-total-pesos-prag')) document.getElementById('res-total-pesos-prag').innerText = `${pesosEnteros} Pesos ${strRealesRestantes} Reales`;
}

function limpiarPastaARealesPragmatica() {
  ['pasta-marcos-prag', 'pasta-onzas-prag', 'pasta-ochavas-prag', 'pasta-tomines-prag', 'pasta-granos-prag', 'pasta-dineros-prag', 'pasta-granos-ley-prag'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  ['warn-pasta-onzas-prag', 'warn-pasta-ochavas-prag', 'warn-pasta-tomines-prag', 'warn-pasta-granos-prag'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = '';
  });

  ['res-pasta-marcos-prag', 'res-pasta-onzas-prag', 'res-pasta-ochavas-prag', 'res-pasta-tomines-prag', 'res-pasta-granos-prag', 'res-pasta-dineros-prag', 'res-pasta-granos-ley-prag'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = '0 granos';
  });

  if (document.getElementById('res-total-marcos-prag')) document.getElementById('res-total-marcos-prag').innerText = '0,0000 Marcos';
  if (document.getElementById('res-total-granos-ley-prag')) document.getElementById('res-total-granos-ley-prag').innerText = '0 Granos';
  if (document.getElementById('res-marcos-rieles-prag')) document.getElementById('res-marcos-rieles-prag').innerText = '0,0000 Marcos';
  if (document.getElementById('res-total-reales-prag')) document.getElementById('res-total-reales-prag').innerText = '0,00 Reales';
  if (document.getElementById('res-total-pesos-prag')) document.getElementById('res-total-pesos-prag').innerText = '0 Pesos 0 Reales';
}




/* ==========================================================================
   CÁLCULO DINÁMICO DE PASTA A REALES Y PESOS (CON FINEZA Y RIELES)
   ========================================================================= */
function calcularPastaAReales() {
  const elMarcos = document.getElementById('pasta-marcos');
  const elOnzas = document.getElementById('pasta-onzas');
  const elOchavas = document.getElementById('pasta-ochavas');
  const elTomines = document.getElementById('pasta-tomines');
  const elGranos = document.getElementById('pasta-granos');
  
  const elDineros = document.getElementById('pasta-dineros');
  const elGranosLey = document.getElementById('pasta-granos-ley');
  const elPeriodo = document.getElementById('periodo-reforma');

  if (!elMarcos || !elPeriodo) return;

  const marcos = parseFloat(elMarcos.value) || 0;
  const onzas = parseFloat(elOnzas ? elOnzas.value : 0) || 0;
  const ochavas = parseFloat(elOchavas ? elOchavas.value : 0) || 0;
  const tomines = parseFloat(elTomines ? elTomines.value : 0) || 0;
  const granos = parseFloat(elGranos ? elGranos.value : 0) || 0;

  const dineros = parseFloat(elDineros ? elDineros.value : 0) || 0;
  const granosLey = parseFloat(elGranosLey ? elGranosLey.value : 0) || 0;

  const wOnzas = document.getElementById('warn-pasta-onzas');
  const wOchavas = document.getElementById('warn-pasta-ochavas');
  const wTomines = document.getElementById('warn-pasta-tomines');
  const wGranos = document.getElementById('warn-pasta-granos');

  if (wOnzas)   wOnzas.innerText   = onzas >= 7   ? '(8 onzas es un marco)' : '';
  if (wOchavas) wOchavas.innerText = ochavas >= 7 ? '(8 ochavas es una onza)' : '';
  if (wTomines) wTomines.innerText = tomines >= 5 ? '(6 tomines es una ochava)' : '';
  if (wGranos)  wGranos.innerText  = granos >= 11 ? '(12 granos es un tomín)' : '';

  const gMarcos = marcos * 4608;
  const gOnzas = onzas * 576;
  const gOchavas = ochavas * 72;
  const gTomines = tomines * 12;
  const gGranos = granos * 1;

  if (document.getElementById('res-pasta-marcos')) document.getElementById('res-pasta-marcos').innerText = `${gMarcos} granos`;
  if (document.getElementById('res-pasta-onzas')) document.getElementById('res-pasta-onzas').innerText = `${gOnzas} granos`;
  if (document.getElementById('res-pasta-ochavas')) document.getElementById('res-pasta-ochavas').innerText = `${gOchavas} granos`;
  if (document.getElementById('res-pasta-tomines')) document.getElementById('res-pasta-tomines').innerText = `${gTomines} granos`;
  if (document.getElementById('res-pasta-granos')) document.getElementById('res-pasta-granos').innerText = `${gGranos} granos`;

  const gDineros = dineros * 24;
  const gGranosLeyVal = granosLey * 1;
  const totalGranosLey = gDineros + gGranosLeyVal;

  if (document.getElementById('res-pasta-dineros')) document.getElementById('res-pasta-dineros').innerText = `${gDineros} granos`;
  if (document.getElementById('res-pasta-granos-ley')) document.getElementById('res-pasta-granos-ley').innerText = `${gGranosLeyVal} granos`;

  const totalGranosPeso = gMarcos + gOnzas + gOchavas + gTomines + gGranos;
  const marcosTotales = totalGranosPeso / 4608;

  const esPreBorbonico = elPeriodo.value === 'pre';
  const divisorRieles = esPreBorbonico ? 268 : 264;
  
  const marcosEnRieles = totalGranosLey > 0 
    ? (marcosTotales * totalGranosLey) / divisorRieles 
    : 0;

  const multiplicadorReales = esPreBorbonico ? 67 : 68;
  const totalReales = marcosEnRieles * multiplicadorReales;
  
  const pesosEnteros = Math.floor(totalReales / 8);
  const realesRestantes = totalReales % 8;

  const strRealesRestantes = Number.isInteger(realesRestantes)
    ? realesRestantes
    : parseFloat(realesRestantes.toFixed(1));

  if (document.getElementById('res-total-marcos')) document.getElementById('res-total-marcos').innerText = `${marcosTotales.toFixed(4)} Marcos`;
  if (document.getElementById('res-total-granos-ley')) document.getElementById('res-total-granos-ley').innerText = `${totalGranosLey} Granos`;
  if (document.getElementById('res-marcos-rieles')) document.getElementById('res-marcos-rieles').innerText = `${marcosEnRieles.toFixed(6)} Marcos`;
  if (document.getElementById('res-total-reales')) document.getElementById('res-total-reales').innerText = `${totalReales.toFixed(2)} Reales`;
  if (document.getElementById('res-total-pesos')) document.getElementById('res-total-pesos').innerText = `${pesosEnteros} Pesos ${strRealesRestantes} Reales`;
}

function limpiarPastaAReales() {
  ['pasta-marcos', 'pasta-onzas', 'pasta-ochavas', 'pasta-tomines', 'pasta-granos', 'pasta-dineros', 'pasta-granos-ley'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  ['warn-pasta-onzas', 'warn-pasta-ochavas', 'warn-pasta-tomines', 'warn-pasta-granos'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = '';
  });

  ['res-pasta-marcos', 'res-pasta-onzas', 'res-pasta-ochavas', 'res-pasta-tomines', 'res-pasta-granos', 'res-pasta-dineros', 'res-pasta-granos-ley'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = '0 granos';
  });

  if (document.getElementById('res-total-marcos')) document.getElementById('res-total-marcos').innerText = '0,0000 Marcos';
  if (document.getElementById('res-total-granos-ley')) document.getElementById('res-total-granos-ley').innerText = '0 Granos';
  if (document.getElementById('res-marcos-rieles')) document.getElementById('res-marcos-rieles').innerText = '0,0000 Marcos';
  if (document.getElementById('res-total-reales')) document.getElementById('res-total-reales').innerText = '0,00 Reales';
  if (document.getElementById('res-total-pesos')) document.getElementById('res-total-pesos').innerText = '0 Pesos 0 Reales';
}

/* ==========================================================================
   LÓGICA MATEMÁTICA VALIDAD CONVERSIÓN (Conversión de Pesos (Época Virreinal))
   ========================================================================= */
function validarLimitesPesos() {
  const limites = [
    { id: 'mod-onza', max: 8, msg: '8 onzas equivalen a 1 marco' },
    { id: 'mod-ochava', max: 8, msg: '8 ochavas equivalen a 1 onza' },
    { id: 'mod-tomin', max: 6, msg: '6 tomines equivalen a 1 ochava' },
    { id: 'mod-grano', max: 12, msg: '12 granos equivalen a 1 tomín' },
  ];

  limites.forEach(item => {
    const input = document.getElementById(item.id);
    if (!input) return;

    // Buscar la fila contenedora padre (.conversion-row)
    const filaContenedora = input.closest('.conversion-row');
    if (!filaContenedora) return;

    // Buscar o crear el contenedor de error al final de la fila
    let errContainer = filaContenedora.querySelector('.error-mensaje-rojo');
    if (!errContainer) {
      errContainer = document.createElement('div');
      errContainer.className = 'error-mensaje-rojo';
      filaContenedora.appendChild(errContainer);
    }

    const val = parseFloat(input.value) || 0;

    if (val >= item.max) {
      errContainer.textContent = item.msg;
      input.classList.add('input-error');
    } else {
      errContainer.textContent = '';
      input.classList.remove('input-error');
    }
  });
}
function calcularModal(tipo) {
  // Ejecutar primero la validación visual de alertas
  validarLimitesPesos();

  // Valores de los inputs
  const marco = parseFloat(document.getElementById('mod-marco')?.value) || 0;
  const onza = parseFloat(document.getElementById('mod-onza')?.value) || 0;
  const ochava = parseFloat(document.getElementById('mod-ochava')?.value) || 0;
  const tomin = parseFloat(document.getElementById('mod-tomin')?.value) || 0;
  const grano = parseFloat(document.getElementById('mod-grano')?.value) || 0;

  // Factores de conversión a gramos
  const gMarco = marco * 230.04650;
  const gOnza = onza * 28.75581;
  const gOchava = ochava * 3.59448;
  const gTomin = tomin * 0.59908;
  const gGrano = grano * 0.04992;

  // Renderizar subtotales por fila
  if (document.getElementById('res-mod-marco')) document.getElementById('res-mod-marco').textContent = `${gMarco.toFixed(4)} g`;
  if (document.getElementById('res-mod-onza')) document.getElementById('res-mod-onza').textContent = `${gOnza.toFixed(4)} g`;
  if (document.getElementById('res-mod-ochava')) document.getElementById('res-mod-ochava').textContent = `${gOchava.toFixed(4)} g`;
  if (document.getElementById('res-mod-tomin')) document.getElementById('res-mod-tomin').textContent = `${gTomin.toFixed(4)} g`;
  if (document.getElementById('res-mod-grano')) document.getElementById('res-mod-grano').textContent = `${gGrano.toFixed(4)} g`;

  // Renderizar Total Combinado
  const total = gMarco + gOnza + gOchava + gTomin + gGrano;
  const elTotal = document.getElementById('res-mod-total');
  if (elTotal) {
    elTotal.textContent = `${total.toFixed(4)} g (${(total / 1000).toFixed(6)} kg)`;
  }
}

function limpiarConversor() {
  const ids = ['mod-marco', 'mod-onza', 'mod-ochava', 'mod-tomin', 'mod-grano'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  calcularModal();
}

/* ==========================================================================
   Cálculo de la Fineza de la Plata (Virreinato
   ========================================================================= */
function calcularModalFineza() {
  const inputDinero = document.getElementById('mod-dinero');
  const inputGrano = document.getElementById('mod-grano');

  const errDinero = document.getElementById('error-mod-dinero');
  const errGrano = document.getElementById('error-mod-grano');

  const dinero = parseFloat(inputDinero?.value) || 0;
  const grano = parseFloat(inputGrano?.value) || 0;

  // --- 1. VALIDACIÓN EN ROJO ---
  if (dinero >= 12) {
    if (errDinero) errDinero.textContent = '12 dineros representan plata pura (1000 fineza)';
    inputDinero?.classList.add('input-error');
  } else {
    if (errDinero) errDinero.textContent = '';
    inputDinero?.classList.remove('input-error');
  }

  if (grano >= 24) {
    if (errGrano) errGrano.textContent = '24 granos equivalen a 1 dinero';
    inputGrano?.classList.add('input-error');
  } else {
    if (errGrano) errGrano.textContent = '';
    inputGrano?.classList.remove('input-error');
  }

  // --- 2. CÁLCULO EN MILÉSIMAS DE FINO ---
  const milDinero = dinero * 83.33333;
  const milGrano = grano * 3.47222;
  const totalFineza = milDinero + milGrano;

  // --- 3. MOSTRAR RESULTADOS ---
  const resDinero = document.getElementById('res-mod-dinero');
  const resGrano = document.getElementById('res-mod-grano');
  const resTotal = document.getElementById('res-mod-total');

  if (resDinero) resDinero.textContent = milDinero.toFixed(4);
  if (resGrano) resGrano.textContent = milGrano.toFixed(4);
  if (resTotal) resTotal.textContent = `${totalFineza.toFixed(4)} / 1000`;
}

// Función auxiliar para el botón Limpiar
function limpiarConversorFineza() {
  const inputDinero = document.getElementById('mod-dinero');
  const inputGrano = document.getElementById('mod-grano');

  if (inputDinero) inputDinero.value = '';
  if (inputGrano) inputGrano.value = '';

  calcularModalFineza();
}


/* ==========================================================================
   LÓGICA MATEMÁTICA Y MOTOR DE CONVERSIÓN COMPLETO (PRAGMÁTICAS 1772 - 1786)
   ========================================================================= */

// Event Listener Global Reactivo
document.addEventListener("input", (e) => {
  const target = e.target;
  if (!target || !target.id) return;

  if (target.id.startsWith("m7286-")) ejecutarCalculoAuto7286();
  if (target.id.startsWith("m86-")) ejecutarCalculoAuto86();
  if (target.id.startsWith("m72-")) ejecutarCalculoAutoPlata1772();
});

/* ==========================================
   MOTORES MATEMÁTICOS DE CÁLCULO
   ========================================== */

// Motor A: Oro Pragmática Secreta 1772-1786 (Ley 86.5 / 88)
function calcularOro1772(m, oz, och, tom, gr, q, grLey) {
  const totalGranosPeso = (m * 4608) + (oz * 576) + (och * 72) + (tom * 12) + gr;
  const marcosTotales = totalGranosPeso / 4608;

  const totalGranosLey = (q * 4) + grLey;

  if (totalGranosLey === 0 || totalGranosPeso === 0) {
    return {
      marcosRieles: "0,000000",
      totalEscudos: "0,000",
      pesos: 0,
      escudosRestantes: "0,00"
    };
  }

  // Divisor de Ley 1772: 86.5 granos ley (21 quilates y 2.5 granos)
  const marcosRieles = (marcosTotales * totalGranosLey) / 86.5;
  const totalEscudos = marcosRieles * 68; // 68 escudos por marco de riel

  // Conversión a Pesos de Oro (1 Peso = 8 Escudos según especificación)
  const pesosDivision = totalEscudos / 8;
  const pesos = Math.floor(pesosDivision);
  const escudosRestantes = (pesosDivision - pesos) * 8;

  return {
    marcosRieles: marcosRieles.toFixed(6).replace(".", ","),
    totalEscudos: totalEscudos.toFixed(3).replace(".", ","),
    pesos: pesos,
    escudosRestantes: escudosRestantes.toFixed(1).replace(".", ",")
  };
}

// Motor B: Oro Pragmática Secreta 1786 (Ley 84)
function calcularOro1786(m, oz, och, tom, gr, q, grLey) {
  const totalGranosPeso = (m * 4608) + (oz * 576) + (och * 72) + (tom * 12) + gr;
  const marcosTotales = totalGranosPeso / 4608;

  const totalGranosLey = (q * 4) + grLey;

  if (totalGranosLey === 0 || totalGranosPeso === 0) {
    return {
      marcosRieles: "0,000000",
      totalEscudos: "0,000",
      pesos: 0,
      escudosRestantes: "0,00"
    };
  }

  // Divisor de Ley 1786: 84 granos ley (21 quilates)
  const marcosRieles = (marcosTotales * totalGranosLey) / 84;
  const totalEscudos = marcosRieles * 68;

  // Conversión a Pesos de Oro
  const pesosDivision = totalEscudos / 8;
  const pesos = Math.floor(pesosDivision);
  let escudosRestantes = (pesosDivision - pesos) * 8;

  // Regla de Negocio 1786: Si da "0,xxx" (menor a 1) se evalúa como 0 escudos
  if (escudosRestantes < 1) {
    escudosRestantes = 0;
  }

  return {
    marcosRieles: marcosRieles.toFixed(6).replace(".", ","),
    totalEscudos: totalEscudos.toFixed(3).replace(".", ","),
    pesos: pesos,
    escudosRestantes: escudosRestantes === 0 ? "0" : escudosRestantes.toFixed(2).replace(".", ",")
  };
}

// Motor C: Plata Pragmática Secreta 1772
function calcularPlata1772(m, oz, och, tom, gr, din, grPlata) {
  const totalGranosPeso = (m * 4608) + (oz * 576) + (och * 72) + (tom * 12) + gr;
  const marcosTotales = totalGranosPeso / 4608;

  const totalGranosLeyPlata = (din * 24) + grPlata;

  if (totalGranosLeyPlata === 0 || totalGranosPeso === 0) {
    return {
      marcosRieles: "0,000000",
      totalReales: "0,000",
      pesos: 0,
      realesRestantes: "0,00"
    };
  }

  // Ley base Plata 1772: 260 granos ley
  const marcosRieles = (marcosTotales * totalGranosLeyPlata) / 260;
  const totalReales = marcosRieles * 68; // 68 reales por marco de riel

  const pesosDivision = totalReales / 8; // 1 Peso de a 8 reales = 8 Reales
  const pesos = Math.floor(pesosDivision);
  const realesRestantes = (pesosDivision - pesos) * 8;

  return {
    marcosRieles: marcosRieles.toFixed(6).replace(".", ","),
    totalReales: totalReales.toFixed(3).replace(".", ","),
    pesos: pesos,
    realesRestantes: realesRestantes.toFixed(2).replace(".", ",")
  };
}

/* ==========================================
   EJECUTORES Y CONTROLADORES DE INTERFAZ
   ========================================== */

function ejecutarCalculoAuto7286() {
  const m = parseFloat(document.getElementById("m7286-marcos")?.value) || 0;
  const oz = parseFloat(document.getElementById("m7286-onzas")?.value) || 0;
  const och = parseFloat(document.getElementById("m7286-ochavas")?.value) || 0;
  const tom = parseFloat(document.getElementById("m7286-tomines")?.value) || 0;
  const gr = parseFloat(document.getElementById("m7286-granos")?.value) || 0;
  const q = parseFloat(document.getElementById("m7286-quilates")?.value) || 0;
  const grLey = parseFloat(document.getElementById("m7286-granos-ley")?.value) || 0;

  // Alertas de peso
  let alertPeso = "";
  if (oz >= 8) alertPeso += "• 8 onzas es 1 marco.<br>";
  if (och >= 8) alertPeso += "• 8 ochavas es 1 onza.<br>";
  if (tom >= 6) alertPeso += "• 6 tomines es 1 ochava.<br>";
  if (gr >= 12) alertPeso += "• 12 granos es 1 tomín.<br>";

  const elemPeso = document.getElementById("m7286-alerta-peso");
  if (elemPeso) elemPeso.innerHTML = alertPeso;

  // Alertas de ley
  let alertLey = "";
  if (q >= 25) alertLey += "• Error: La máxima fineza es de 24 quilates.<br>";
  if (grLey >= 4) alertLey += "• 4 granos es 1 quilate.<br>";

  const elemLey = document.getElementById("m7286-alerta-ley");
  if (elemLey) elemLey.innerHTML = alertLey;

  if (q >= 25) return;

  const res = calcularOro1772(m, oz, och, tom, gr, q, grLey);
  if (res) {
    document.getElementById("m7286-res-rieles").textContent = res.marcosRieles;
    document.getElementById("m7286-res-escudos").textContent = res.totalEscudos;
    document.getElementById("m7286-res-final").textContent = `${res.pesos} Pesos, ${res.escudosRestantes} Escudos`;
  }
}

function ejecutarCalculoAuto86() {
  const m = parseFloat(document.getElementById("m86-marcos")?.value) || 0;
  const oz = parseFloat(document.getElementById("m86-onzas")?.value) || 0;
  const och = parseFloat(document.getElementById("m86-ochavas")?.value) || 0;
  const tom = parseFloat(document.getElementById("m86-tomines")?.value) || 0;
  const gr = parseFloat(document.getElementById("m86-granos")?.value) || 0;
  const q = parseFloat(document.getElementById("m86-quilates")?.value) || 0;
  const grLey = parseFloat(document.getElementById("m86-granos-ley")?.value) || 0;

  // Alertas de peso
  let alertPeso = "";
  if (oz >= 8) alertPeso += "• 8 onzas es 1 marco.<br>";
  if (och >= 8) alertPeso += "• 8 ochavas es 1 onza.<br>";
  if (tom >= 6) alertPeso += "• 6 tomines es 1 ochava.<br>";
  if (gr >= 12) alertPeso += "• 12 granos es 1 tomín.<br>";

  const elemPeso = document.getElementById("m86-alerta-peso");
  if (elemPeso) elemPeso.innerHTML = alertPeso;

  // Alertas de ley
  let alertLey = "";
  if (q >= 25) alertLey += "• Error: La máxima fineza es de 24 quilates.<br>";
  if (grLey >= 4) alertLey += "• 4 granos es 1 quilate.<br>";

  const elemLey = document.getElementById("m86-alerta-ley");
  if (elemLey) elemLey.innerHTML = alertLey;

  if (q >= 25) return;

  const res = calcularOro1786(m, oz, och, tom, gr, q, grLey);
  if (res) {
    document.getElementById("m86-res-rieles").textContent = res.marcosRieles;
    document.getElementById("m86-res-escudos").textContent = res.totalEscudos;
    document.getElementById("m86-res-final").textContent = `${res.pesos} Pesos, ${res.escudosRestantes} Escudos`;
  }
}

function ejecutarCalculoAutoPlata1772() {
  const m = parseFloat(document.getElementById("m72-marcos")?.value) || 0;
  const oz = parseFloat(document.getElementById("m72-onzas")?.value) || 0;
  const och = parseFloat(document.getElementById("m72-ochavas")?.value) || 0;
  const tom = parseFloat(document.getElementById("m72-tomines")?.value) || 0;
  const gr = parseFloat(document.getElementById("m72-granos")?.value) || 0;
  const din = parseFloat(document.getElementById("m72-dineros")?.value) || 0;
  const grPlata = parseFloat(document.getElementById("m72-granos-plata")?.value) || 0;

  // Alertas de peso
  let alertPeso = "";
  if (oz >= 8) alertPeso += "• 8 onzas es 1 marco.<br>";
  if (och >= 8) alertPeso += "• 8 ochavas es 1 onza.<br>";
  if (tom >= 6) alertPeso += "• 6 tomines es 1 ochava.<br>";
  if (gr >= 12) alertPeso += "• 12 granos es 1 tomín.<br>";

  const elemPeso = document.getElementById("m72-alerta-peso");
  if (elemPeso) elemPeso.innerHTML = alertPeso;

  // Alertas de fineza (Plata)
  let alertLey = "";
  if (din >= 13) alertLey += "• Error: La máxima fineza en plata es de 12 dineros.<br>";
  if (grPlata >= 24) alertLey += "• 24 granos es 1 dinero.<br>";

  const elemLey = document.getElementById("m72-alerta-ley");
  if (elemLey) elemLey.innerHTML = alertLey;

  if (din >= 13) return;

  const res = calcularPlata1772(m, oz, och, tom, gr, din, grPlata);
  if (res) {
    document.getElementById("m72-res-rieles").textContent = res.marcosRieles;
    document.getElementById("m72-res-reales").textContent = res.totalReales;
    document.getElementById("m72-res-final").textContent = `${res.pesos} Pesos, ${res.realesRestantes} Reales`;
  }
}

/* ==========================================
   FUNCIONES DE LIMPIEZA
   ========================================== */

function limpiarConversorOro7286() {
  const ids = ['m7286-marcos', 'm7286-onzas', 'm7286-ochavas', 'm7286-tomines', 'm7286-granos', 'm7286-quilates', 'm7286-granos-ley'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });

  if (document.getElementById('m7286-alerta-peso')) document.getElementById('m7286-alerta-peso').innerText = "";
  if (document.getElementById('m7286-alerta-ley')) document.getElementById('m7286-alerta-ley').innerText = "";

  if (document.getElementById('m7286-res-rieles')) document.getElementById('m7286-res-rieles').innerText = '0,000000';
  if (document.getElementById('m7286-res-escudos')) document.getElementById('m7286-res-escudos').innerText = '0,000';
  if (document.getElementById('m7286-res-final')) document.getElementById('m7286-res-final').innerText = '0 Pesos, 0 Escudos';
}

function limpiarConversorOro1786() {
  const ids = ['m86-marcos', 'm86-onzas', 'm86-ochavas', 'm86-tomines', 'm86-granos', 'm86-quilates', 'm86-granos-ley'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });

  if (document.getElementById('m86-alerta-peso')) document.getElementById('m86-alerta-peso').innerText = "";
  if (document.getElementById('m86-alerta-ley')) document.getElementById('m86-alerta-ley').innerText = "";

  if (document.getElementById('m86-res-rieles')) document.getElementById('m86-res-rieles').innerText = '0,000000';
  if (document.getElementById('m86-res-escudos')) document.getElementById('m86-res-escudos').innerText = '0,000';
  if (document.getElementById('m86-res-final')) document.getElementById('m86-res-final').innerText = '0 Pesos, 0 Escudos';
}

function limpiarConversorPlata() {
  const ids = ['m72-marcos', 'm72-onzas', 'm72-ochavas', 'm72-tomines', 'm72-granos', 'm72-dineros', 'm72-granos-plata'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });

  if (document.getElementById('m72-alerta-peso')) document.getElementById('m72-alerta-peso').innerText = "";
  if (document.getElementById('m72-alerta-ley')) document.getElementById('m72-alerta-ley').innerText = "";

  if (document.getElementById('m72-res-rieles')) document.getElementById('m72-res-rieles').innerText = '0,000000';
  if (document.getElementById('m72-res-reales')) document.getElementById('m72-res-reales').innerText = '0,000';
  if (document.getElementById('m72-res-final')) document.getElementById('m72-res-final').innerText = '0 Pesos, 0,00 Reales';
}
/* ==========================================================================
   AUXILIARES
   ========================================================================= */

function limpiarConversor() {
  const modal = document.querySelector('#modal-pasta-reales, #modal-pesos-virreinales, .macuquina-modal, .macuquina-modal-overlay');
  if (!modal) return;

  const inputs = modal.querySelectorAll("input[id^='mod-']");
  inputs.forEach(inp => inp.value = "");

  const modo = window.modoConversorActual || "";
  const esMilesima = (modo.includes("fineza") || modo.includes("grano_ley") || modo.includes("quilates") || modo.includes("granos"));

  const outputs = modal.querySelectorAll("[id^='res-mod-']");
  outputs.forEach(out => {
      out.innerText = "0.0000" + (esMilesima ? " ‰" : " g");
      out.style.color = "#222";
  });

  const errores = modal.querySelectorAll("[id^='error-mod-']");
  errores.forEach(err => err.innerText = "");

  const totalBox = document.getElementById("res-mod-total");
  if (totalBox) {
    totalBox.innerText = "0.0000" + (esMilesima ? " ‰" : " g");
    totalBox.style.color = "#b38f43";
  }
}

function setMainActiveTab() {
    const path = window.location.pathname;
    const currentFile = path.split("/").pop() || 'index.html';
    const currentFileNormal = currentFile.toLowerCase();
    
    const navLinks = document.querySelectorAll('.tab-btn');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref.toLowerCase().includes(currentFileNormal)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function closeModalFineza() {
  closeModalOro();
}

function closeModalFinezaOuter(event) {
  closeModalPesosOuter(event);
}

function toggleFabMenu() {
  const fabContainer = document.getElementById('fab-container');
  if (fabContainer) {
    fabContainer.classList.toggle('active');
  }
}

function iniciarContadorVisitas() {
  const c = document.getElementById("contador-visitas");
  
  if (c) {
    // Usamos un nuevo nombre ("visitas_macuquinas_v2") para forzar el reinicio desde 0
    let visitas = localStorage.getItem("visitas_macuquinas_v2");
    
    if (visitas === null) {
      visitas = 0; 
    } else {
      visitas = parseInt(visitas) + 1; 
    }
    
    localStorage.setItem("visitas_macuquinas_v2", visitas);
    c.innerHTML = `📖 Visitas: <strong>${Number(visitas).toLocaleString('es-CL')}</strong>`;
  } else {
    console.error("Error: No se encontró el elemento 'contador-visitas' en el HTML.");
  }
}

/* ==========================================================================
   CONTROL DEL MENÚ PRINCIPAL (CORREGIDO PARA CUALQUIER ESTADO)
   ========================================================================= */
function toggleModalConversores(e) {
  if (e) e.stopPropagation();

  const menuWrapper = document.getElementById('modal-conversores-wrapper');
  if (!menuWrapper) return;

  // Evalúa el estado REAL en el DOM en este preciso instante
  const estaAbierto = menuWrapper.classList.contains('open') || 
                      menuWrapper.style.display === 'flex' ||
                      menuWrapper.style.display === 'block';

  if (estaAbierto) {
    // Forzado de cierre completo
    menuWrapper.classList.remove('open', 'active');
    menuWrapper.style.display = 'none';
    document.body.style.overflow = '';
  } else {
    // Forzado de apertura
    menuWrapper.style.display = 'flex';
    menuWrapper.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
  }
}
/* ==========================================================================
   CONVERSOR DE PASTA DE ORO (ANTES REFORMA BORBÓNICA)
   ========================================================================= */

window.closeModalPastaOro1 = function(elemento) {
  const modal = elemento 
    ? elemento.closest('#modal-pasta-oro1') 
    : document.getElementById("modal-pasta-oro1");

  if (modal) {
    modal.remove();
  } else {
    document.querySelectorAll('#modal-pasta-oro1').forEach(m => m.remove());
  }
  document.body.style.overflow = "";
};

window.closeModalPasta1Outer = function(event) {
  if (event.target && event.target.id === 'modal-pasta-oro1') {
    window.closeModalPastaOro1(event.target);
  }
};

// 1. FUNCIÓN DE LIMPIEZA
window.limpiarPastaOro1 = function () {
  const ids = [
    'p1_marcos',
    'p1_castellanos',
    'p1_tomines',
    'p1_granos',
    'p1_quilates',
    'p1_fineza_granos'
  ];

  // Deja las cajas de texto completamente vacías
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Limpia advertencias o mensajes de error
  const warnIds = [
    'p1_warn_castellanos',
    'p1_warn_tomines',
    'p1_warn_granos',
    'p1_err_quilates',
    'p1_warn_fineza_granos'
  ];
  warnIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  // Resetea ÚNICAMENTE las etiquetas de resultados (sin tocar los inputs)
  document.getElementById('p1_res_valor_total').textContent = '0';
  document.getElementById('p1_res_marcos_totales').textContent = '0,0000 marcos';
  document.getElementById('p1_res_total_granos_ley').textContent = '0 granos';
  document.getElementById('p1_res_marcos_rieles').textContent = '0,000000 marcos';
  document.getElementById('p1_res_final_escudos').textContent = '0,0 escudos';
  document.getElementById('p1_res_final_pesos').textContent = '0 pesos 0 escudos';
};

// 2. FUNCIÓN DE CÁLCULO (Ajuste para no escribir en los inputs)
window.calcularPastaOro1 = function () {
  // Obtener los valores (si está vacío usa 0 para el cálculo interno)
  const marcos = parseFloat(document.getElementById('p1_marcos').value) || 0;
  const castellanos = parseFloat(document.getElementById('p1_castellanos').value) || 0;
  const tomines = parseFloat(document.getElementById('p1_tomines').value) || 0;
  const granos = parseFloat(document.getElementById('p1_granos').value) || 0;
  const quilates = parseFloat(document.getElementById('p1_quilates').value) || 0;
  const finezaGranos = parseFloat(document.getElementById('p1_fineza_granos').value) || 0;

  // IMPORTANTE:
  // Asegúrate de NO tener líneas como:
  // document.getElementById('p1_marcos').value = marcos;
  // ya que eso reinserta el "0" dentro del cuadro de texto.

  // Realiza las operaciones matemáticas necesarias...
  // y actualiza solamente los contenedores de RESULTADOS (textContent o innerHTML).
};

window.calcularPastaOro1 = function() {
  const elMarcos = document.getElementById("p1_marcos");
  if (!elMarcos) return;

  const marcos = parseFloat(document.getElementById("p1_marcos")?.value) || 0;
  const castellanos = parseFloat(document.getElementById("p1_castellanos")?.value) || 0;
  const tomines = parseFloat(document.getElementById("p1_tomines")?.value) || 0;
  const granos = parseFloat(document.getElementById("p1_granos")?.value) || 0;

  const quilates = parseFloat(document.getElementById("p1_quilates")?.value) || 0;
  const finezaGranos = parseFloat(document.getElementById("p1_fineza_granos")?.value) || 0;

  const setMsg = (id, cond, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = cond ? text : "";
  };

  setMsg("p1_warn_castellanos", castellanos >= 50, "(50 castellanos es un marco)");
  setMsg("p1_warn_tomines", tomines >= 8, "(8 tomines es un castellano)");
  setMsg("p1_warn_granos", granos >= 12, "(12 granos es un tomín)");
  setMsg("p1_err_quilates", quilates > 24, " Error: La máxima fineza es 24 quilates");
  setMsg("p1_warn_fineza_granos", finezaGranos >= 4, "(4 granos es un quilate)");

  const valorTotal = (marcos * 4800) + (castellanos * 96) + (tomines * 12) + granos;
  const marcosTotales = valorTotal / 4800;
  const totalGranosLey = (quilates * 4) + finezaGranos;
  const marcosEnRieles = (marcosTotales * totalGranosLey) / 88;
  const escudosTotales = marcosEnRieles * 68;

  const pesosEnteros = Math.floor(escudosTotales / 8);
  const escudosRestantes = escudosTotales - (pesosEnteros * 8);

  const setTxt = (id, text) => {
    const node = document.getElementById(id);
    if (node) node.innerText = text;
  };

  setTxt("p1_res_valor_total", valorTotal.toLocaleString("es-ES"));
  setTxt("p1_res_marcos_totales", marcosTotales.toFixed(4).replace(".", ",") + " marcos");
  setTxt("p1_res_total_granos_ley", totalGranosLey + " granos");
  setTxt("p1_res_marcos_rieles", marcosEnRieles.toFixed(6).replace(".", ",") + " marcos");
  setTxt("p1_res_final_escudos", escudosTotales.toFixed(1).replace(".", ",") + " escudos");
  setTxt("p1_res_final_pesos", `${pesosEnteros} pesos ${escudosRestantes.toFixed(1).replace(".", ",")} escudos`);
};

/* ==========================================================================
   CONVERSOR DE PASTA DE ORO A ESCUDOS Y PESOS (POSTERIOR A REFORMA BORBÓNICA)
   ========================================================================= */

window.closeModalPastaOroBorbonica = function(elemento) {
  const modal = elemento 
    ? elemento.closest('#modal-pasta-oro-borbonica') 
    : document.getElementById("modal-pasta-oro-borbonica");

  if (modal) {
    modal.remove();
  } else {
    document.querySelectorAll('#modal-pasta-oro-borbonica').forEach(m => m.remove());
  }
  document.body.style.overflow = "";
};

window.closeModalPastaOroOuter = function(event) {
  if (event.target && event.target.id === 'modal-pasta-oro-borbonica') {
    window.closeModalPastaOroBorbonica(event.target);
  }
};

// ==========================================
// FUNCIÓN DE LIMPIEZA
// ==========================================
window.limpiarPastaOroBorbonica = function () {
  // Lista de todos los IDs de entrada
  const inputIds = [
    "po_marcos",
    "po_onzas",
    "po_ochavas",
    "po_tomines",
    "po_granos",
    "po_quilates",
    "po_fineza_granos"
  ];

  // 1. Vaciar únicamente los inputs (quedan invisibles con placeholder="0")
  inputIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // 2. Limpiar mensajes de advertencia/error
  const warnIds = [
    "po_warn_onzas",
    "po_warn_ochavas",
    "po_warn_tomines",
    "po_warn_granos",
    "po_err_quilates",
    "po_warn_fineza_granos"
  ];
  warnIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerText = "";
  });

  // 3. Restablecer etiquetas de resultados a su estado inicial
  const setTxt = (id, text) => {
    const node = document.getElementById(id);
    if (node) node.innerText = text;
  };

  setTxt("po_res_valor_total", "0");
  setTxt("po_res_marcos_totales", "0,0000 marcos");
  setTxt("po_res_total_granos_ley", "0 granos");
  setTxt("po_res_marcos_rieles", "0,000000 marcos");
  setTxt("po_res_equiv_moneda", "0,0 escudos");
  setTxt("po_res_final", "0 pesos 0 Escudos");
};

// ==========================================
// FUNCIÓN DE CÁLCULO
// ==========================================
window.calcularPastaOroBorbonica = function () {
  const elMarcos = document.getElementById("po_marcos");
  if (!elMarcos) return;

  const marcos = parseFloat(document.getElementById("po_marcos")?.value) || 0;
  const onzas = parseFloat(document.getElementById("po_onzas")?.value) || 0;
  const ochavas = parseFloat(document.getElementById("po_ochavas")?.value) || 0;
  const tomines = parseFloat(document.getElementById("po_tomines")?.value) || 0;
  const granos = parseFloat(document.getElementById("po_granos")?.value) || 0;

  const quilates = parseFloat(document.getElementById("po_quilates")?.value) || 0;
  const finezaGranos = parseFloat(document.getElementById("po_fineza_granos")?.value) || 0;

  const setMsg = (id, cond, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = cond ? text : "";
  };

  setMsg("po_warn_onzas", onzas >= 8, "(8 onzas es un marco)");
  setMsg("po_warn_ochavas", ochavas >= 8, "(8 ochavas es una onza)");
  setMsg("po_warn_tomines", tomines >= 6, "(6 tomines es una ochava)");
  setMsg("po_warn_granos", granos >= 12, "(12 granos es un tomín)");

  const esErrorQuilates = quilates >= 25;
  setMsg("po_err_quilates", esErrorQuilates, "Error: La máxima fineza es de 24 quilates");
  setMsg("po_warn_fineza_granos", finezaGranos >= 4, "(4 granos es un quilate)");

  const valorTotalUnidades = (marcos * 4608) + (onzas * 576) + (ochavas * 72) + (tomines * 12) + granos;
  const marcosTotales = valorTotalUnidades / 4608;

  const totalGranosLey = (quilates * 4) + finezaGranos;
  const marcosEnRieles = (marcosTotales * totalGranosLey) / 88;

  const escudosTotales = marcosEnRieles * 68;

  const pesosDivision = escudosTotales / 8;
  const pesosEnteros = Math.floor(pesosDivision);
  const residuoDecimal = pesosDivision - pesosEnteros;
  const escudosRestantes = residuoDecimal * 8;

  const setTxt = (id, text) => {
    const node = document.getElementById(id);
    if (node) node.innerText = text;
  };

  setTxt("po_res_valor_total", valorTotalUnidades.toLocaleString("es-ES"));
  setTxt("po_res_marcos_totales", marcosTotales.toFixed(4).replace(".", ",") + " marcos");
  setTxt("po_res_total_granos_ley", `${totalGranosLey} granos`);

  if (esErrorQuilates) {
    setTxt("po_res_marcos_rieles", "Error en Ley");
    setTxt("po_res_equiv_moneda", "Error en Ley");
    setTxt("po_res_final", "Error en Ley");
  } else {
    setTxt("po_res_marcos_rieles", marcosEnRieles.toFixed(6).replace(".", ",") + " marcos");
    setTxt("po_res_equiv_moneda", escudosTotales.toFixed(3).replace(".", ",") + " escudos");

    if (valorTotalUnidades === 0 && totalGranosLey === 0) {
      setTxt("po_res_final", "0 pesos 0 Escudos");
    } else {
      setTxt(
        "po_res_final",
        `${pesosEnteros} pesos ${escudosRestantes.toFixed(1).replace(".", ",")} Escudos`
      );
    }
  }
};

window.calcularPastaOroBorbonica = function() {
  const elMarcos = document.getElementById("po_marcos");
  if (!elMarcos) return;

  const marcos = parseFloat(document.getElementById("po_marcos")?.value) || 0;
  const onzas = parseFloat(document.getElementById("po_onzas")?.value) || 0;
  const ochavas = parseFloat(document.getElementById("po_ochavas")?.value) || 0;
  const tomines = parseFloat(document.getElementById("po_tomines")?.value) || 0;
  const granos = parseFloat(document.getElementById("po_granos")?.value) || 0;

  const quilates = parseFloat(document.getElementById("po_quilates")?.value) || 0;
  const finezaGranos = parseFloat(document.getElementById("po_fineza_granos")?.value) || 0;

  const setMsg = (id, cond, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = cond ? text : "";
  };

  setMsg("po_warn_onzas", onzas >= 8, "(8 onzas es un marco)");
  setMsg("po_warn_ochavas", ochavas >= 8, "(8 ochavas es una onza)");
  setMsg("po_warn_tomines", tomines >= 6, "(6 tomines es una ochava)");
  setMsg("po_warn_granos", granos >= 12, "(12 granos es un tomín)");
  
  const esErrorQuilates = quilates >= 25;
  setMsg("po_err_quilates", esErrorQuilates, "Error: La máxima fineza es de 24 quilates");
  setMsg("po_warn_fineza_granos", finezaGranos >= 4, "(4 granos es un quilate)");

  const valorTotalUnidades = (marcos * 4608) + (onzas * 576) + (ochavas * 72) + (tomines * 12) + granos;
  const marcosTotales = valorTotalUnidades / 4608;

  const totalGranosLey = (quilates * 4) + finezaGranos;
  const marcosEnRieles = (marcosTotales * totalGranosLey) / 88;

  const escudosTotales = marcosEnRieles * 68;

  const pesosDivision = escudosTotales / 8;
  const pesosEnteros = Math.floor(pesosDivision);
  const residuoDecimal = pesosDivision - pesosEnteros;
  const escudosRestantes = residuoDecimal * 8;

  const setTxt = (id, text) => {
    const node = document.getElementById(id);
    if (node) node.innerText = text;
  };

  setTxt("po_res_valor_total", valorTotalUnidades.toLocaleString("es-ES"));
  setTxt("po_res_marcos_totales", marcosTotales.toFixed(4).replace(".", ",") + " marcos");
  setTxt("po_res_total_granos_ley", `${totalGranosLey} granos`);

  if (esErrorQuilates) {
    setTxt("po_res_marcos_rieles", "Error en Ley");
    setTxt("po_res_equiv_moneda", "Error en Ley");
    setTxt("po_res_final", "Error en Ley");
  } else {
    setTxt("po_res_marcos_rieles", marcosEnRieles.toFixed(6).replace(".", ",") + " marcos");
    setTxt("po_res_equiv_moneda", escudosTotales.toFixed(3).replace(".", ",") + " escudos");

    if (valorTotalUnidades === 0 && totalGranosLey === 0) {
      setTxt("po_res_final", "0 pesos 0 Escudos");
    } else {
      setTxt(
        "po_res_final", 
        `${pesosEnteros} pesos ${escudosRestantes.toFixed(1).replace(".", ",")} Escudos`
      );
    }
  }
};


/* ==========================================================================
   FUNCIÓN EXCLUSIVA PARA CERRAR EL MENÚ PRINCIPAL DE CONVERSIONES
   ========================================================================= */
function cerrarMenuConversores() {
  const menuWrapper = document.getElementById('modal-conversores-wrapper') || 
                      document.getElementById('modal-menu-conversion');

  if (menuWrapper) {
    menuWrapper.style.display = 'none';
    menuWrapper.classList.remove('open', 'active');
  }

  // Devuelve el scroll normal a la página web
  document.body.style.overflow = '';
}



/* ==========================================================================
   2. LÓGICA DEL BUSCADOR DE CONTENIDO CON RESALTADO FORZADO
   ========================================================================= */

const paginasExcluidas = [
  'conversor_oro_bar.html',
  'conversor_oro1.html',
  'conversor_oro2.html',
  'conversor.html',
  'conversor1.html',
  'conversor2.html',
  'conversor3.html',
  'footer.html',
  'menu.html'
];

function resaltarTexto(texto, query) {
  if (!texto || !query) return texto || '';
  const queryEscaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${queryEscaped})`, 'gi');
  
  const estiloHighlight = 'background-color: #d4af37 !important; color: #000000 !important; font-weight: bold !important; padding: 0px 4px !important; border-radius: 3px !important; display: inline-block !important;';
  
  return texto.replace(regex, `<mark class="search-highlight" style="${estiloHighlight}">$1</mark>`);
}

function obtenerExtracto(contenido, query) {
  if (!contenido || !query) return '';
  const idx = contenido.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return '';

  const inicio = Math.max(0, idx - 20);
  const fin = Math.min(contenido.length, idx + query.length + 30);
  let extracto = contenido.substring(inicio, fin);

  if (inicio > 0) extracto = '...' + extracto;
  if (fin < contenido.length) extracto = extracto + '...';

  return resaltarTexto(extracto, query);
}

window.openSearchModal = function() {
  const modal = document.getElementById('modal-buscador');
  const input = document.getElementById('input-busqueda');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = '';
      input.focus();
    }
    window.ejecutarBusqueda();
  }
};

window.closeSearchModal = function() {
  const modal = document.getElementById('modal-buscador');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.closeSearchOuter = function(event) {
  if (event && event.target && event.target.id === 'modal-buscador') {
    window.closeSearchModal();
  }
};

window.ejecutarBusqueda = function() {
  const input = document.getElementById('input-busqueda');
  const contenedor = document.getElementById('resultados-busqueda');
  if (!input || !contenedor) return;

  if (typeof indiceBusqueda === 'undefined') {
    contenedor.innerHTML = '<p class="search-placeholder">Error: No se ha cargado datos-busqueda.js en la página.</p>';
    return;
  }

  const query = input.value.toLowerCase().trim();

  if (query.length < 2) {
    contenedor.innerHTML = '<p class="search-placeholder">Escribe al menos 2 letras para buscar...</p>';
    return;
  }

  const resultados = indiceBusqueda.filter(item => {
    const urlArchivo = (item.url || '').split('/').pop();
    if (paginasExcluidas.includes(urlArchivo)) return false;

    const titulo = (item.titulo || '').toLowerCase();
    const contenido = (item.contenido || '').toLowerCase();
    const categoria = (item.categoria || '').toLowerCase();

    return titulo.includes(query) || contenido.includes(query) || categoria.includes(query);
  });

  if (resultados.length === 0) {
    contenedor.innerHTML = `<p class="search-placeholder">No se encontraron resultados para "${query}".</p>`;
    return;
  }

  let html = '';
  resultados.forEach(res => {
    const tituloResaltado = resaltarTexto(res.titulo, query);
    const categoriaResaltada = resaltarTexto(res.categoria, query);
    const extractoContenido = obtenerExtracto(res.contenido, query);

    html += `
      <a href="${res.url}" class="search-item" style="display: block; padding: 10px; border-bottom: 1px solid #333; text-decoration: none;">
        <div>
          <span class="search-item-title" style="font-size: 16px; font-weight: bold; color: #f3e5ab;">${tituloResaltado}</span>
          <span class="search-item-cat" style="font-size: 12px; color: #aaa; margin-left: 10px;">${categoriaResaltada}</span>
        </div>
        ${extractoContenido ? `<div style="font-size: 13px; color: #ccc; margin-top: 4px;">${extractoContenido}</div>` : ''}
      </a>
    `;
  });

  contenedor.innerHTML = html;
};

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (typeof window.openSearchModal === 'function') window.openSearchModal();
  } else if (e.key === 'Escape') {
    if (typeof window.closeSearchModal === 'function') window.closeSearchModal();
  }
});


// Factor de conversión: 1000 ‰ / 288 granos = 3.472222222...
const FACTOR_GRANO_LEY = 1000 / 288; 

// ==========================================
// FUNCIÓN DE CÁLCULO DE GRANO DE LEY
// ==========================================
window.calcularGranoLey = function () {
  const inputEl = document.getElementById("mod-granoley");
  const resEl = document.getElementById("res-mod-granoley");
  const totalEl = document.getElementById("res-mod-total");
  const errorEl = document.getElementById("error-mod-granoley");

  if (!inputEl) return;

  // Leer valor ingresado (si está vacío toma 0)
  const val = parseFloat(inputEl.value) || 0;

  // Validaciones
  if (val < 0) {
    if (errorEl) errorEl.innerText = "El valor no puede ser negativo";
    if (resEl) resEl.innerText = "0.0000 ‰";
    if (totalEl) totalEl.innerText = "0.0000 ‰";
    return;
  }

  if (val > 288) {
    if (errorEl) errorEl.innerText = "Error: El máximo es 288 granos (1000 ‰)";
    if (resEl) resEl.innerText = "Error";
    if (totalEl) totalEl.innerText = "Error";
    return;
  }

  // Limpiar mensajes de error si está en rango
  if (errorEl) errorEl.innerText = "";

  // Calcular milésimas de pureza
  const milesimas = val * FACTOR_GRANO_LEY;
  const textoResultado = milesimas.toFixed(4).replace(".", ",") + " ‰";

  // Actualizar la interfaz
  if (resEl) resEl.innerText = textoResultado;
  if (totalEl) totalEl.innerText = textoResultado;
};

// ==========================================
// FUNCIÓN DE LIMPIEZA
// ==========================================
window.limpiarConversor = function () {
  const inputEl = document.getElementById("mod-granoley");
  const resEl = document.getElementById("res-mod-granoley");
  const totalEl = document.getElementById("res-mod-total");
  const errorEl = document.getElementById("error-mod-granoley");

  // Vaciar la casilla para que se vea únicamente el placeholder="0"
  if (inputEl) inputEl.value = "";
  if (errorEl) errorEl.innerText = "";

  // Restablecer etiquetas con la unidad en milésimas (‰)
  if (resEl) resEl.innerText = "0,0000 ‰";
  if (totalEl) totalEl.innerText = "0,0000 ‰";
};


// ==========================================
// Enviar Email de contacto (solo abre el modal
// , no envía nada)
// ==========================================
function openEmailModal() {
  const modal = document.getElementById("modal-contacto-email");
  if (modal) {
    modal.classList.add("active");
  }
}

function closeEmailModal() {
  const modal = document.getElementById("modal-contacto-email");
  if (modal) {
    modal.classList.remove("active");
  }
}

function closeEmailOuter(event) {
  if (event.target.id === "modal-contacto-email") {
    closeEmailModal();
  }
}