const niveles = ["-A1", "A1", "A2", "B1", "B2", "C1", "C2", "C3"];
let configuracion = { acento: "Estadounidense 🇺🇸", meta: "IELTS" };
let aciertosGlobal = 0;

function cargarDashboard() {
    const nav = document.getElementById('levels');
    const configArea = document.getElementById('config-area');
    if (!nav || !configArea) return;

    configArea.innerHTML = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; border:2px solid #3b82f6; color:white; margin-bottom:20px;">
            <h3>🌍 Entrenamiento Global Legend</h3>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <select onchange="configuracion.acento = this.value" style="padding:10px; border-radius:5px; background:#0f172a; color:white;">
                    <option>Estadounidense 🇺🇸</option>
                    <option>Británico 🇬🇧</option>
                    <option>Australiano 🇦🇺</option>
                    <option>Canadiense 🇨🇦</option>
                </select>
                <select onchange="configuracion.meta = this.value" style="padding:10px; border-radius:5px; background:#0f172a; color:white;">
                    <option>IELTS</option>
                    <option>TOEFL</option>
                    <option>Cambridge (C2)</option>
                </select>
            </div>
        </div>`;

    nav.innerHTML = "";
    niveles.forEach(lvl => {
        const div = document.createElement('div');
        div.className = "card level-card";
        div.innerHTML = `<h3>Level ${lvl}</h3>`;
        if (lvl === '-A1') {
            div.style.border = "2px solid #3b82f6";
            div.style.cursor = "pointer";
            div.onclick = mostrarMapaBloques;
        } else { div.style.opacity = "0.4"; }
        nav.appendChild(div);
    });
}

function mostrarMapaBloques() {
    const area = document.getElementById('area-estudio');
    const leccion = lessonsA1Minus[0];
    let htmlBloques = leccion.blocks.map(b => `
        <button onclick="estudiar(${b.id})" style="width:100%; padding:15px; margin-bottom:8px; background:#3b82f6; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">
            📖 ${b.title}
        </button>`).join('');

    area.innerHTML = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; color:white;">
            <h2 style="text-align:center;">Mapa de Bloques -A1</h2>
            ${htmlBloques}
            <div id="pantalla-dinamica" style="margin-top:20px;"></div>
        </div>`;
}

function estudiar(id) {
    const bloque = lessonsA1Minus[0].blocks.find(b => b.id === id);
    const pantalla = document.getElementById('pantalla-dinamica');
    pantalla.innerHTML = `
        <div style="background:#0f172a; padding:20px; border-radius:12px; border:2px solid #22c55e;">
            <h3 style="color:#22c55e;">Vocabulario del Bloque</h3>
            <p>💡 Tip: ${bloque.tip}</p>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap:10px;">
                ${bloque.words.map(w => `<div style="background:white; color:black; padding:10px; border-radius:5px; text-align:center;"><b>${w.en}</b><br>${w.es}</div>`).join('')}
            </div>
            <button onclick="examenBloque(${id})" style="width:100%; padding:15px; background:#22c55e; color:white; border:none; border-radius:8px; margin-top:20px; font-weight:bold; cursor:pointer;">INICIAR EXAMEN (10 PREGUNTAS)</button>
        </div>`;
}

function examenBloque(id) {
    const bloque = lessonsA1Minus[0].blocks.find(b => b.id === id);
    const pantalla = document.getElementById('pantalla-dinamica');
    aciertosGlobal = 0;
    let html = `<h3 style="text-align:center; color:#3b82f6;">Examen: ${bloque.title}</h3>`;

    bloque.examen.forEach((p, i) => {
        html += `
            <div style="background:#334155; padding:15px; margin-bottom:10px; border-radius:10px;">
                <p>${p.q}</p>
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    ${p.o.map(opt => `<button onclick="validar(this, '${opt}', '${p.r}', 10, ${id})" style="padding:10px; background:#1e293b; color:white; border:1px solid #3b82f6; cursor:pointer; border-radius:5px;">${opt}</button>`).join('')}
                </div>
            </div>`;
    });
    pantalla.innerHTML = html;
}

function validar(btn, elegida, correcta, total, blockId) {
    if (elegida === correcta) {
        btn.style.background = "#22c55e";
        btn.disabled = true;
        aciertosGlobal++;
        if (aciertosGlobal === total) { pantallaVictoria(); }
    } else {
        pantallaDerrota(blockId);
    }
}

function pantallaVictoria() {
    // 1. Base de datos de frases motivadoras (Dopamina)
    const frasesMotivadoras = [
        "¡NIVEL LEYENDA ACTIVADO! ⚡",
        "¡TU CEREBRO ESTÁ EN FUEGO! 🔥",
        "¡IMPARABLE! EL ÉXITO TE PERSIGUE 🚀",
        "¡ESTÁS DOMINANDO EL MUNDO! 🌍",
        "¡PODER CEREBRAL AL MÁXIMO! 🧠✨"
    ];
    const frase = frasesMotivadoras[Math.floor(Math.random() * frasesMotivadoras.length)];

    // 2. Lógica de Tips dinámicos por Acento + Examen
    let proTipExtra = "";
    
    if (configuracion.acento.includes("Británico")) {
        proTipExtra = configuracion.meta === "Cambridge (C2)" 
            ? "Tip Pro: En Cambridge UK, usa 'Indeed' para sonar más sofisticado." 
            : "Tip Pro: Para el IELTS, recuerda pronunciar la 't' claramente en palabras como 'Water'.";
    } else if (configuracion.acento.includes("Estadounidense")) {
        proTipExtra = configuracion.meta === "TOEFL" 
            ? "Tip Pro: En el TOEFL usa conectores como 'Furthermore' para ganar puntos extra." 
            : "Tip Pro: En USA, la fluidez es clave; une las palabras al hablar (Connected Speech).";
    } else if (configuracion.acento.includes("Australiano")) {
        proTipExtra = "Tip Pro: ¡G'day mate! El acento Aussie es rítmico. Mantén las vocales largas para sonar natural.";
    } else {
        proTipExtra = `Tip Pro Especial: Estás dominando el estándar de ${configuracion.meta}. ¡Sigue así!`;
    }

    // 3. Renderizado de la pantalla de victoria épica
    document.getElementById('pantalla-dinamica').innerHTML = `
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding:50px; border-radius:30px; border:5px solid #f59e0b; text-align:center; box-shadow: 0 0 30px rgba(245, 158, 11, 0.4); animation: victoryJump 0.6s ease-out;">
            <h1 style="font-size:5em; margin:0; filter: drop-shadow(0 0 10px #f59e0b);">🏆</h1>
            <h2 style="color:#f59e0b; font-size:2.5em; text-transform:uppercase; letter-spacing:2px;">${frase}</h2>
            
            <div style="background: rgba(255,255,255,0.05); padding:20px; border-radius:15px; margin: 20px 0; border-left: 10px solid #22c55e;">
                <p style="color: #22c55e; font-weight: bold; font-size: 1.3em; margin:0;">🎯 LOGRO DESBLOQUEADO: 10/10 PERFECTO</p>
                <p style="color: #f8fafc; font-style: italic; margin-top:10px;">"${proTipExtra}"</p>
            </div>

            <p style="font-size:1.1em; color:#94a3b8;">Has demostrado maestría en el acento <b>${configuracion.acento}</b>.</p>
            
            <button onclick="mostrarMapaBloques()" style="background:linear-gradient(45deg, #f59e0b, #d97706); color:white; padding:20px 40px; border:none; border-radius:50px; font-size:1.5em; font-weight:bold; cursor:pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.3); transition: 0.3s; margin-top:20px;">
                ¡QUIERO MÁS! PRÓXIMO RETO ➔
            </button>
        </div>`;
}

function pantallaDerrota(blockId) {
    // 1. Frases de Reencuadre Psicológico (Resiliencia)
    const mensajesMotivadores = [
        "LOS GRANDES MAESTROS FALLAN HASTA ACERTAR. 💡",
        "ESTO NO ES UN ERROR, ES UN ENTRENAMIENTO DE ÉLITE. 💪",
        "TU CEREBRO ESTÁ AJUSTANDO LOS DATOS. ¡VUELVE A INTENTARLO! 🧠",
        "EL ACENTO PERFECTO REQUIERE PULIDO. ¡CASI LO TIENES! ✨",
        "REPETIR ES LA MADRE DE LA MAESTRÍA. 🏆"
    ];
    const frase = mensajesMotivadores[Math.floor(Math.random() * mensajesMotivadores.length)];

    // 2. Tip Psicológico según el Examen
    let consejoPsicologico = "";
    if (configuracion.meta.includes("Cambridge")) {
        consejoPsicologico = "En Cambridge C2, fallar una vez es aprender a ser preciso bajo presión. ¡Tómate un respiro y vuelve con todo!";
    } else if (configuracion.meta.includes("IELTS")) {
        consejoPsicologico = "El IELTS castiga los descuidos pequeños. Esta es la oportunidad perfecta para revisar ese detalle que se escapó.";
    } else {
        consejoPsicologico = "El éxito es ir de fracaso en fracaso sin perder el entusiasmo. ¡Tú tienes el poder!";
    }

    // 3. Renderizado de Pantalla de "Recarga"
    document.getElementById('pantalla-dinamica').innerHTML = `
        <div style="background: linear-gradient(135deg, #1e1b4b 0%, #450a0a 100%); padding:50px; border-radius:30px; border:5px solid #ef4444; text-align:center; box-shadow: 0 0 40px rgba(239, 68, 68, 0.3); animation: shake 0.5s ease-in-out;">
            <h1 style="font-size:5em; margin:0; filter: drop-shadow(0 0 10px #ef4444);">⚡</h1>
            <h2 style="color:#f87171; font-size:2em; text-transform:uppercase;">${frase}</h2>
            
            <div style="background: rgba(0,0,0,0.3); padding:20px; border-radius:15px; margin: 25px 0; border-left: 10px solid #fbbf24;">
                <p style="color: #fbbf24; font-weight: bold; font-size: 1.1em; margin:0;">🧠 ANALIZANDO TU PROGRESO...</p>
                <p style="color: #f8fafc; margin-top:10px; font-style: italic;">"${consejoPsicologico}"</p>
            </div>

            <p style="color:#cbd5e1;">Acento actual: <b>${configuracion.acento}</b>. Tu meta sigue intacta.</p>
            
            <button onclick="estudiar(${blockId})" style="background:linear-gradient(45deg, #ef4444, #b91c1c); color:white; padding:20px 40px; border:none; border-radius:50px; font-size:1.3em; font-weight:bold; cursor:pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.3); transition: 0.3s; margin-top:20px; text-transform:uppercase;">
                ¡RECARGAR Y REINTENTAR! 🚀
            </button>
        </div>`;
}
window.onload = cargarDashboard;