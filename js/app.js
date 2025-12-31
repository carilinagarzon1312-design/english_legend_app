// CONFIGURACIÓN DE FIREBASE (RELLENA CON TUS DATOS)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    databaseURL: "https://TU_PROYECTO-default-rtdb.firebaseio.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_ID_APP"
};

let database = null;
try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    database = firebase.database();
} catch (e) { console.warn("Modo offline activado"); }

let currentUser = JSON.parse(localStorage.getItem('englishUser')) || null;
let aciertosTemp = 0;

window.onload = () => {
    actualizarUI();
    dibujarNiveles();
};

function createUser() {
    const name = document.getElementById('username-input').value.trim();
    if (!name) return alert("Por favor, elige un nombre.");
    currentUser = { name: name, completedBlocks: [] };
    guardarYSubir();
    actualizarUI();
}

function guardarYSubir() {
    localStorage.setItem('englishUser', JSON.stringify(currentUser));
    if (database && currentUser) {
        database.ref('ranking/' + currentUser.name.replace(/\s+/g, '_')).set({
            username: currentUser.name,
            score: currentUser.completedBlocks.length
        });
    }
}

function actualizarUI() {
    const login = document.getElementById('login-section');
    const stats = document.getElementById('stats-section');
    if (!currentUser) {
        login.style.display = 'block';
        return;
    }
    login.style.display = 'none';
    stats.style.display = 'block';
    document.getElementById('display-username').innerText = "Hero: " + currentUser.name;
    
    const count = currentUser.completedBlocks.length;
    const perc = Math.round((count / 40) * 100);
    const bar = document.getElementById('main-progress-bar');
    bar.style.width = perc + "%";
    bar.innerText = perc + "%";
    document.getElementById('progress-text').innerText = `Has conquistado ${count} de 40 bloques`;
}

function dibujarNiveles() {
    const nav = document.getElementById('levels');
    const niveles = ["-A1", "A1", "A2", "B1", "B2", "C1", "C2", "C3"];
    nav.innerHTML = niveles.map(l => `
        <div class="level-card ${l === '-A1' ? 'unlocked' : 'locked'}" 
             onclick="${l === '-A1' ? 'abrirMapaBloques()' : ''}">
            <h3>${l}</h3>
            <span>${l === '-A1' ? 'DISPONIBLE' : 'BLOQUEADO'}</span>
        </div>
    `).join('');
}

function abrirMapaBloques() {
    const area = document.getElementById('area-estudio');
    const bloques = lessonsA1Minus[0].blocks;
    area.innerHTML = `
        <div class="card blocks-panel">
            <h2 style="color: #3b82f6;">Módulos de Nivel -A1</h2>
            <div class="scroll-grid">
                ${bloques.map(b => {
                    const ok = currentUser.completedBlocks.includes(b.id);
                    return `<button onclick="iniciarEstudio(${b.id})" class="btn-block ${ok ? 'btn-done' : ''}">
                        ${ok ? '✅' : '📖'} ${b.title}
                    </button>`;
                }).join('')}
            </div>
            <div id="zona-practica"></div>
        </div>
    `;
    area.scrollIntoView({ behavior: 'smooth' });
}

function iniciarEstudio(id) {
    const b = lessonsA1Minus[0].blocks.find(x => x.id === id);
    aciertosTemp = 0;
    let html = `<div class="exam-box">
        <h3>Examen: ${b.title}</h3>
        <p style="color: #94a3b8;">Necesitas 10/10 para aprobar</p>`;
    b.examen.forEach((p, i) => {
        html += `<div class="question-unit">
            <p>${i+1}. ${p.q}</p>
            <div class="options">
                ${p.o.map(o => `<button onclick="validarOpcion(this, '${o}', '${p.r}', ${id})" class="opt-btn">${o}</button>`).join('')}
            </div>
        </div>`;
    });
    document.getElementById('zona-practica').innerHTML = html + `</div>`;
}

function validarOpcion(btn, sel, res, id) {
    if (sel === res) {
        btn.classList.add('correct');
        btn.disabled = true;
        aciertosTemp++;
        if (aciertosTemp === 10) {
            if (!currentUser.completedBlocks.includes(id)) currentUser.completedBlocks.push(id);
            guardarYSubir();
            actualizarUI();
            alert("✨ ¡BLOQUE CONQUISTADO! +1 Punto en el Ranking");
            abrirMapaBloques();
        }
    } else {
        alert("❌ Respuesta incorrecta. El examen se reiniciará para que refuerces el aprendizaje.");
        iniciarEstudio(id);
    }
}

function showRanking() {
    document.getElementById('ranking-modal').style.display = 'block';
    const list = document.getElementById('ranking-list');
    list.innerHTML = "<p>Conectando con la nube...</p>";
    
    database.ref('ranking').orderByChild('score').limitToLast(10).on('value', snap => {
        let rows = [];
        snap.forEach(c => rows.push(c.val()));
        rows.reverse();
        list.innerHTML = rows.map((r, i) => `
            <div class="rank-row ${r.username === currentUser.name ? 'highlight' : ''}">
                <span>#${i+1} ${r.username}</span>
                <span class="score-pill">${r.score} blq</span>
            </div>
        `).join('');
    });
}

function closeRanking() { document.getElementById('ranking-modal').style.display = 'none'; }