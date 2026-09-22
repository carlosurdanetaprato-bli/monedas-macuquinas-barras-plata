document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA AUTOMÁTICA PARA CÁPSULAS DE VIDEO ---
    const videoGrid = document.getElementById('video-grid-container');
    
    if (videoGrid) {
        const misCapsulas = [
            {
                id: "ssqho4M8kKI",
                titulo: "Fraude en las Monedas Rochunas (Parte 2): Ganancias Ilícitas",
                nota: " Análisis teórico y pormenorizado de las prácticas fraudulentas aplicadas a la alteración de barras de plata mediante la disminución deliberada de su ley metálica, a través del incremento indebido de la liga, durante el período de actividades ilícitas encabezadas por el defraudador Francisco Gómez de la Rocha.",
                urlOriginal: "https://youtu.be/ssqho4M8kKI"
            },
            {
                id: "m6_ST3RiWsA",
                titulo: "Fraude en las Monedas Rochunas (Parte 1): Rebaja de Plata",
                nota: "Demostración técnica de cómo los funcionarios mezclaban de forma fraudulenta barras puras de 12 dineros con exceso de cobre en los rieles.",
                urlOriginal: "https://youtu.be/m6_ST3RiWsA"
            },
            {
                id: "lAF8y4zJFpA",
                titulo: "Dos Monedas Potosinas que debieron ser Reselladas",
                nota: "Estudio sobre la devaluación obligatoria ordenada por Nestares Marín que redujo el value de los reales macuquinos en el mercado.",
                urlOriginal: "https://youtu.be/lAF8y4zJFpA"
            },
            {
                id: "kDHlod5YFjY",
                titulo: "El Ensayador Encarcelado en la misma Casa de Moneda",
                nota: "La increíble historia de Félix Cristóbal Cano Melgarejo y las ordenanzas de ley, peso y estampa bajo el reinado de Felipe V.",
                urlOriginal: "https://youtu.be/kDHlod5YFjY"
            },
            {
                id: "6f7eA4aUYUw",
                titulo: "La Talla de la Moneda 'Rincón' de Lima (1568-1570) - Parte 2",
                nota: "Cálculos matemáticos aplicados al Marco Castellano para entender el peso exacto y los residuos de cizalla de las primeras piezas sudamericanas.",
                urlOriginal: "https://youtu.be/6f7eA4aUYUw"
            },
            {
                id: "A4ThmusAwhE",
                titulo: "Impronta de la Moneda 'Rincón' de Lima - Parte 1",
                nota: "Análisis heráldico y paleográfico según el documento original de 1565 otorgado por el rey Felipe II.",
                urlOriginal: "https://youtu.be/A4ThmusAwhE"
            },
            {
                id: "UzcMdmQEC6g",
                titulo: "Dos Series de Macuquinas Potosinas: Cálculo del Peso",
                nota: "Comparativa de pesos teóricos entre la Pragmática de Medina del Campo (1497) y las reformas de los Borbones del siglo XVIII.",
                urlOriginal: "https://youtu.be/UzcMdmQEC6g"
            },
            {
                id: "CVXcKnlZ-L0",
                titulo: "Dos Series de Macuquinas Potosinas: Cálculo de Fineza",
                nota: "Aprende las variaciones de milésimas de plata fina entre las emisiones de los Reyes Católicos y la reforma de 1728.",
                urlOriginal: "https://youtu.be/CVXcKnlZ-L0"
            },
            {
                id: "Pz0pw1Dl3HQ",
                titulo: "Moneda Macuquina Potosina Mula (1747)",
                nota: "Un error extraordinario de acuñación que unió un anverso diseñado para 1/2 Real junto a un reverso correspondiente a 1 Real.",
                urlOriginal: "https://youtu.be/Pz0pw1Dl3HQ"
            }
        ];

        videoGrid.innerHTML = '';
        misCapsulas.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';
            
            card.innerHTML = `
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/${video.id}?rel=0" 
                            title="${video.titulo}" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <h3>${video.titulo}</h3>
                    <div class="video-note">
                        <strong>Nota del Canal:</strong> ${video.nota}
                    </div>
                    <div class="video-actions">
                        <a href="${video.urlOriginal}" target="_blank" class="btn-yt-link">Ver en YouTube 📺</a>
                        <a href="${video.urlOriginal}" target="_blank" class="btn-like-yt">👍 Dar Like</a>
                    </div>
                </div>
            `;
            videoGrid.appendChild(card);
        });
    }
});