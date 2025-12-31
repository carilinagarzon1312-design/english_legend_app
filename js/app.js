// CONFIGURACIÓN FIREBASE (RELLENA CON TUS DATOS)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    databaseURL: "https://TU_PROYECTO-default-rtdb.firebaseio.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_ID_APP"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let currentUser = JSON.parse(localStorage.getItem('englishUser')) || null;
let aciertosTemp = 0;

window.onload = () => {
    actualizarVista();
    renderizarNiveles();
};

function createUser() {
    const name = document.getElementById('username-input').value.trim();
    if (name.length < 3) return alert("Nombre demasiado corto");
    currentUser = { name, completedBlocks: [] };
    guardarProgreso();
    actualizarVista();
}

function guardarProgreso() {
    localStorage.setItem('englishUser', JSON.stringify(currentUser));
    if (database && currentUser) {
        database.ref('ranking/' + currentUser.name.replace(/\s+/g, '_')).set({
            username: currentUser.name,
            score: currentUser.completedBlocks.length
        });
    }
}

function actualizarVista() {
    const login = document.getElementById('login-section');
    const stats = document.getElementById('stats-section');
    if (!currentUser) { login.style.display = 'block'; return; }
    
    login.style.display = 'none';
    stats.style.display = 'block';
    document.getElementById('display-username').innerText = "Hero: " + currentUser.name;
    
    const total = 40;
    const completados = currentUser.completedBlocks.length;
    const perc = Math.round((completados / total) * 100);
    
    const bar = document.getElementById('main-progress-bar');
    bar.style.width = perc + "%";
    bar.innerText = perc + "%";
    document.getElementById('progress-text').innerText = `Dominio: ${completados} / ${total} Bloques`;
}

function renderizarNiveles() {
    const nav = document.getElementById('levels');
    const lvls = ["-A1", "A1", "A2", "B1", "B2", "C1", "C2", "C3"];
    nav.innerHTML = lvls.map(l => `
        <div class="level-card ${l === '-A1' ? 'unlocked' : 'locked'}" 
             onclick="${l === '-A1' ? 'abrirBloques()' : ''}">
            <h3>${l}</h3>
            <span>${l === '-A1' ? 'DISPONIBLE' : 'BLOQUEADO'}</span>
        </div>
    `).join('');
}

function abrirBloques() {
    const area = document.getElementById('area-estudio');
    const bloques = lessonsA1Minus[0].blocks; // Referencia a tu archivo de lecciones
    area.innerHTML = `
        <div class="card blocks-panel animate-up">
            <h2 style="color: #3b82f6;">MÓDULOS NIVEL -A1</h2>
            <div class="grid-blocks">
                ${bloques.map(b => {
                    const ok = currentUser.completedBlocks.includes(b.id);
                    return `<button onclick="iniciarExamen(${b.id})" class="btn-block ${ok ? 'done' : ''}">
                        ${ok ? '✅' : '📖'} ${b.title}
                    </button>`;
                }).join('')}
            </div>
            <div id="zona-examen"></div>
        </div>
    `;
    area.scrollIntoView({ behavior: 'smooth' });
}

function iniciarExamen(id) {
    const b = lessonsA1Minus[0].blocks.find(x => x.id === id);
    aciertosTemp = 0;
    let html = `<div class="exam-box"><h3>Examen: ${b.title}</h3><p>Logra 10/10 para aprobar</p>`;
    b.examen.forEach((p, i) => {
        html += `<div class="q-unit"><p>${i+1}. ${p.q}</p>
            <div class="options">
                ${p.o.map(o => `<button onclick="validar(this, '${o}', '${p.r}', ${id})" class="opt-btn">${o}</button>`).join('')}
            </div>
        </div>`;
    });
    document.getElementById('zona-examen').innerHTML = html + `</div>`;
}

function validar(btn, sel, res, id) {
    if (sel === res) {
        btn.classList.add('correct');
        btn.disabled = true;
        aciertosTemp++;
        if (aciertosTemp === 10) {
            if (!currentUser.completedBlocks.includes(id)) currentUser.completedBlocks.push(id);
            guardarProgreso(); actualizarVista(); alert("¡BLOQUE COMPLETADO!"); abrirBloques();
        }
    } else {
        alert("❌ Error. Debes ser perfecto. Reiniciando examen...");
        iniciarExamen(id);
    }
}

function showRanking() {
    document.getElementById('ranking-modal').style.display = 'block';
    database.ref('ranking').orderByChild('score').limitToLast(10).on('value', snap => {
        let list = [];
        snap.forEach(c => list.push(c.val()));
        list.reverse();
        document.getElementById('ranking-list').innerHTML = list.map((r, i) => `
            <div class="rank-row ${r.username === currentUser.name ? 'highlight' : ''}">
                <span>#${i+1} ${r.username}</span>
                <span>${r.score} blq</span>
            </div>
        `).join('');
    });
}

function closeRanking() { document.getElementById('ranking-modal').style.display = 'none'; }