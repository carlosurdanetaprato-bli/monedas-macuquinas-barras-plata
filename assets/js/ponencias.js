document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA AUTOMÁTICA PARA PÁGINA DE PONENCIAS ---
    const videoGrid = document.getElementById('video-grid-container');
    
    if (videoGrid) {
        // Base de datos de tus 15 ponencias
        const misPonencias = [
            {
                id: "jbPVsSXjBbI",
                titulo: "Desglose valorico de las Moneda de Oro de Lima, Basado en la Ordenanza de 1755",
                nota: "El documento es un estudio numismático explicativo que calcula el valor real, peso y pureza de las monedas de oro acuñadas en Lima mediados del siglo XVIII.",
                urlOriginal: "https://youtu.be/jbPVsSXjBbI"
            },
            {
                id: "N-vMlc0elwU",
                titulo: "Peso y Fineza de las Monedas de Oro de Lima",
                nota: "Bajo la Ordenanza de 1755, las monedas de oro acuñadas en la Casa de Moneda de Lima (Perú) se estandarizaron para garantizar su valor en el comercio mundial..",
                urlOriginal: "https://youtu.be/N-vMlc0elwU"
            },
            {
                id: "QciuiroZdHU",
                titulo: "Desglose Valorico de la Moneda Columnaria de Lima: Basado en las Ordenanzas de 1755 y Analisis del Ensayador José Rodriguez de Carassa",
                nota: "El estudio analiza la moneda columnaria de plata en Lima bajo la Ordenanza de 1755, que impuso una acuñación circular perfecta con una pureza estricta del 91.6%.",
                urlOriginal: "https://youtu.be/QciuiroZdHU"
            },
            {
                id: "PpmtgtazcHE",
                titulo: "La Moneda de Vellón de 11 Maravedís de Santo Domingo",
                nota: "La moneda de vellón de 11 maravedís de Santo Domingo (emitida bajo el reinado de Juana I y Carlos I tras la apertura de la ceca en 1542) es una de las piezas más raras, anómalas y fascinantes de la numismática colonial americana..",
                urlOriginal: "https://youtu.be/PpmtgtazcHE"
            },
            {
                id: "mWlXgQfD1hs",
                titulo: "Marcaje de una Barra Potosina",
                nota: "El marcaje de una barra potosina (de la Villa Imperial de Potosí, actual Bolivia) refiere al conjunto de sellos y marcas que la Corona española estampaba obligatoriamente en los lingotes de plata.",
                urlOriginal: "https://youtu.be/mWlXgQfD1hs"
            },
            {
                id: "aawb5Mnu4tA",
                titulo: "Analisis de las Barras de Plata Regsitradas en la Caja Real de Arica",
                nota: "Esta ponencia se fundamenta en un documento de las Cajas Reales de Arica y se estructura en dos secciones. La primera aborda el contexto histórico en el cual se inscribe la fuente; la segunda está dedicada al análisis del registro documental, centrándose en los cálculos matemáticos y el sistema de monedas de cuenta empleado en el Perú virreinal para determinar el valor intrínseco del contenido metálico de una barra consignada en dicho registro.",
                urlOriginal: "https://youtu.be/aawb5Mnu4tA"
            },
            {
                id: "63nV1XT4So0",
                titulo: "Libramiento de 4 Barras de Plata en la Casa de Moneda de Lima en 1765",
                nota: "El Libramiento de 4 Barras de Plata en la Casa de Moneda de Lima en 1765 es un caso de estudio numismático y fiscal que ilustra cómo se aplicaban operativamente las matemáticas de la Ordenanza de 1755.",
                urlOriginal: "https://youtu.be/63nV1XT4So0"
            },
            {
                id: "iJZimMULfoM",
                titulo: "Libramiento Barras de Plata en la Ceca de Lima en el Periodo Fraudulento de Carlos III",
                nota: "El Libramiento de Barras de Plata en la Ceca de Lima durante el Periodo Fraudulento de Carlos III refiere a una de las operaciones de manipulación monetaria secreta más polémicas de la Corona española a finales del siglo XVIII.",
                urlOriginal: "https://youtu.be/iJZimMULfoM"
            },
            {
                id: "3taPh1LFbvw",
                titulo: "Ordenanzas de las Partidas Por Marco para Acuñar Talla en la Reapertura de Lima en 1683",
                nota: "En la numismática colonial, la talla es el número exacto de piezas que se deben cortar (tallar) de una barra de metal fundido del peso de un marco castellano (~230 gramos).",
                urlOriginal: "https://youtu.be/3taPh1LFbvw"
            },
                        {
                id: "ycq4yGjk1Co",
                titulo: "Las Barras de Plata",
                nota: "Las barras de plata también llamadas lingotes, planchas o plata en pasta eran la forma primaria y estandarizada en que el Imperio español fundía el mineral extraído de las ricas minas americanas (como Potosí, Oruro o Zacatecas) para su transporte, contabilidad y posterior acuñación.",
                urlOriginal: "https://youtu.be/ycq4yGjk1Co"
            },
            {
                id: "FzG2odEGUmI",
                titulo: "De Barras a Monedas, Según un documento de libramiento de la Casa de Moneda de Lima en  1751",
                nota: "El documento de libramiento de 1751 de la Real Casa de Moneda de Lima registra con precisión matemática el proceso de transformación física y legal de la plata en pasta (barras) a dinero circulante.",
                urlOriginal: "https://youtu.be/FzG2odEGUmI"
            },
            {
                id: "5OATZ9YUoic",
                titulo: "Registro de Fraude de la  Ceca de  Potosí y Devaluacion de las Monedas en las Cajas Reales de Arica",
                nota: "Esta ponencia analiza el registro de la devaluación monetaria en las Cajas Reales de Arica a mediados del siglo XVII, vinculado a la circulación de moneda potosina. Aunque inicialmente se consideraba que este circulante cumplía con la ley por haber sido acuñado bajo la fiscalización del licenciado Francisco de Nestares Marín, verificaciones posteriores demostraron un contenido argentífero inferior al estipulado por las ordenanzas, lo que forzó una segunda devaluación. Este proceso refleja las profundas repercusiones económicas y administrativas de los fraudes de acuñación en el sistema virreinal, así como las medidas de la Corona para intentar restablecer la confianza en el sistema financiero local. ",
                urlOriginal: "https://youtu.be/5OATZ9YUoic"
            },
            {
                id: "s_iyzfLkgrs",
                titulo: "Composición del Peso  y Pureza de las Monedas de Plata en la Ceca Inicial de Lima",
                nota: "La primera ceca de Lima, establecida oficialmente en 1565 bajo el reinado de Felipe II, marcó el inicio de la acuñación institucional en el Virreinato del Perú. Estas primeras emisiones de plata correspondieron al tipo macuquino, caracterizado por una manufactura artesanal a golpe de martillo que resultaba en cospeles y diseños irregulares. La presente ponencia examina la metrología de estas piezas iniciales —particularmente el cálculo de su fineza y talla— con el objetivo de analizar los parámetros técnicos y normativos que rigieron la producción monetaria en los albores del sistema virreinal peruano.",
                urlOriginal: "https://youtu.be/s_iyzfLkgrs"
            },
            {
                id: "gdB1kFdwhLo",
                titulo: "Peso, Fineza y Valor Intrinceso y Legal de las Monedas Coloniales en la Ceca de Santiago",
                nota: "La Real Casa de Moneda de Santiago (Chile), establecida originalmente en 1743 por el naviero Francisco García Huidobro y oficializada bajo la Corona en 1770, operó con las mismas normativas de peso y ley que el resto de las cecas americanas, sufriendo las mismas alteraciones secretas a finales del siglo XVIII.",
                urlOriginal: "https://youtu.be/gdB1kFdwhLo"
            },
            {
                id: "svCmScFwpRQ",
                titulo: "Monedas Macuquinas Rebaja de la  Fineza y Aumento de la Talla en la Reforma Borbónica en Lima",
                nota: "Esta ponencia analiza las transformaciones técnicas y normativas introducidas en la producción monetaria limeña a fines del siglo XVII. El estudio se centra en la reducción del título de fineza y el incremento en la talla de las piezas, modificaciones incorporadas en las ordenanzas de reapertura de la Casa de Moneda de Lima en 1683. Dichas disposiciones dieron origen a una nueva metrología monetaria aplicada a las emisiones macuquinas, reconfigurando los parámetros de peso, ley y rendimiento de la plata acuñada desde entonces..",
                urlOriginal: "https://youtu.be/svCmScFwpRQ"
            },
            {
                id: "tpXelvoiiwo",
                titulo: "Las Últimas Macuquinas Acuñadas en la Ceca de Lima-1753",
                nota: "Esta ponencia surge de la necesidad de revisar la tradicional atribución de 1752 como el último año de acuñación de monedas macuquinas de plata en la Casa de Moneda de Lima. El análisis de documentación oficial permite cuestionar esta cronología al registrar acuñaciones a martillo efectuadas durante 1753, pese a que hasta la fecha no se conocen ejemplares monetarios fechados en dicho año.\n\nEl estudio tiene por objetivo documentar y demostrar la continuidad de la acuñación macuquina hasta 1753 mediante el análisis comparativo de dos fuentes históricas independientes. Asimismo, se contrastan los marcos de plata consignados con las cantidades de moneda producida, aplicando procedimientos de conversión metrológica que permiten verificar la consistencia de los registros. Finalmente, se examina la ausencia de ejemplares fechados en 1753 y se plantean posibles explicaciones para la aparente divergencia entre la evidencia documental y el registro numismático conocido.",
                urlOriginal: "https://www.youtube.com/watch?v=tpXelvoiiwo"
            }

            ];

        videoGrid.innerHTML = ''; // Limpiar el grid
        misPonencias.forEach(video => {
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
                        <strong>Resumen de Ponencia:</strong> ${video.nota}
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