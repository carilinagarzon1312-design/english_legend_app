// CONFIGURACIÓN DE FIREBASE (ASEGÚRATE DE PONER TUS DATOS REALES)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    databaseURL: "https://TU_PROYECTO-default-rtdb.firebaseio.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_APP_ID"
};

// Inicialización
let database = null;
try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    database = firebase.database();
} catch (e) { console.error("Error al conectar Firebase", e); }

let currentUser = JSON.parse(localStorage.getItem('englishUser')) || null;

window.onload = () => {
    updateUI();
    renderLevels();
};

function createUser() {
    const name = document.getElementById('username-input').value.trim();
    if (!name) return alert("Escribe un nombre");
    currentUser = { name, completedBlocks: [] };
    saveData();
    updateUI();
}

function saveData() {
    localStorage.setItem('englishUser', JSON.stringify(currentUser));
    if (database && currentUser) {
        database.ref('ranking/' + currentUser.name.replace(/\s+/g, '_')).set({
            username: currentUser.name,
            score: currentUser.completedBlocks.length
        });
    }
}

function updateUI() {
    const login = document.getElementById('login-section');
    const stats = document.getElementById('stats-section');
    if (!currentUser) {
        login.style.display = 'block';
        stats.style.display = 'none';
        return;
    }
    login.style.display = 'none';
    stats.style.display = 'block';
    document.getElementById('display-username').innerText = "Estudiante: " + currentUser.name;
    
    const count = currentUser.completedBlocks.length;
    const perc = Math.round((count / 40) * 100);
    const bar = document.getElementById('main-progress-bar');
    bar.style.width = perc + "%";
    bar.innerText = perc + "%";
    document.getElementById('progress-text').innerText = `Bloques: ${count} / 40`;
}

function renderLevels() {
    const nav = document.getElementById('levels');
    const lvls = ["-A1", "A1", "A2", "B1", "B2", "C1", "C2", "C3"];
    nav.innerHTML = lvls.map(l => `
        <div class="level-card ${l === '-A1' ? 'active' : 'locked'}" 
             onclick="${l === '-A1' ? 'showBlocks()' : ''}">
            <h3>Level ${l}</h3>
        </div>
    `).join('');
}

function showBlocks() {
    const area = document.getElementById('area-estudio');
    const blocks = lessonsA1Minus[0].blocks;
    area.innerHTML = `
        <div class="blocks-container">
            <h3>Módulos Nivel -A1</h3>
            ${blocks.map(b => {
                const done = currentUser.completedBlocks.includes(b.id);
                return `<button onclick="startLesson(${b.id})" class="block-btn ${done ? 'done' : ''}">
                    ${done ? '✅' : '📖'} ${b.title}
                </button>`;
            }).join('')}
            <div id="exam-area"></div>
        </div>
    `;
    area.scrollIntoView({ behavior: 'smooth' });
}

function startLesson(id) {
    const block = lessonsA1Minus[0].blocks.find(b => b.id === id);
    let html = `<div class="exam-card"><h4>Examen: ${block.title}</h4>`;
    block.examen.forEach((p, idx) => {
        html += `<div class="question">
            <p>${idx+1}. ${p.q}</p>
            ${p.o.map(o => `<button onclick="checkAns(this, '${o}', '${p.r}', ${id})" class="opt-btn">${o}</button>`).join('')}
        </div>`;
    });
    document.getElementById('exam-area').innerHTML = html + `</div>`;
}

let scoreTemp = 0;
function checkAns(btn, sel, res, id) {
    if (sel === res) {
        btn.style.background = "#22c55e";
        btn.disabled = true;
        scoreTemp++;
        if (scoreTemp === 10) {
            if (!currentUser.completedBlocks.includes(id)) currentUser.completedBlocks.push(id);
            saveData();
            updateUI();
            alert("🎯 ¡Bloque completado!");
            showBlocks();
        }
    } else {
        alert("❌ Fallaste. Repasa e intenta de nuevo.");
        startLesson(id);
    }
}

function showRanking() {
    document.getElementById('ranking-modal').style.display = 'block';
    const list = document.getElementById('ranking-list');
    if (!database) return list.innerHTML = "Error de conexión.";
    
    database.ref('ranking').orderByChild('score').limitToLast(10).on('value', snap => {
        let players = [];
        snap.forEach(c => players.push(c.val()));
        players.reverse();
        list.innerHTML = players.map((p, i) => `
            <div class="rank-item">
                <span>${i+1}. ${p.username} ${p.username === currentUser.name ? '(Tú)' : ''}</span>
                <span class="score">${p.score} blq</span>
            </div>
        `).join('');
    });
}

function closeRanking() { document.getElementById('ranking-modal').style.display = 'none'; }