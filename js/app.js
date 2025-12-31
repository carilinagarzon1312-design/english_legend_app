// ==========================================
// CONFIGURACIÓN DE FIREBASE (PON TUS DATOS AQUÍ)
// ==========================================
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    databaseURL: "https://TU_PROYECTO-default-rtdb.firebaseio.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_ID_APP"
};

// Conexión Segura
let database = null;
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    database = firebase.database();
    console.log("🚀 Conectado al Ranking Mundial");
} catch (e) {
    console.log("⚠️ Trabajando en modo local");
}

// ==========================================
// LÓGICA DE USUARIO Y PROGRESO
// ==========================================
let currentUser = JSON.parse(localStorage.getItem('englishUser')) || null;

window.onload = () => {
    actualizarVista();
    cargarNiveles();
};

function createUser() {
    const input = document.getElementById('username-input');
    const name = input.value.trim();
    if (!name) return alert("Escribe un nombre");

    currentUser = { name: name, completedBlocks: [] };
    guardarTodo();
    actualizarVista();
}

function guardarTodo() {
    // Guardar en tu PC
    localStorage.setItem('englishUser', JSON.stringify(currentUser));
    
    // GUARDAR EN EL RANKING GLOBAL (FIREBASE)
    if (currentUser && database) {
        database.ref('global_ranking/' + currentUser.name.replace(/\s+/g, '_')).set({
            name: currentUser.name,
            blocks: currentUser.completedBlocks.length,
            time: Date.now()
        });
    }
}

function actualizarVista() {
    const login = document.getElementById('login-section');
    const stats = document.getElementById('stats-section');
    
    if (!currentUser) {
        if (login) login.style.display = 'block';
        if (stats) stats.style.display = 'none';
        return;
    }

    if (login) login.style.display = 'none';
    if (stats) stats.style.display = 'block';

    document.getElementById('display-username').innerText = "👤 Estudiante: " + currentUser.name;
    
    const count = currentUser.completedBlocks.length;
    const progressText = document.getElementById('progress-text');
    if (progressText) progressText.innerText = `Progreso: ${count} de 40 bloques (${Math.round((count/40)*100)}%)`;
}

// ==========================================
// RANKING EN TIEMPO REAL
// ==========================================
function showRanking() {
    const modal = document.getElementById('ranking-modal');
    const list = document.getElementById('ranking-list');
    modal.style.display = 'block';
    
    if (!database) {
        list.innerHTML = "<p style='color:#ffcc00;'>⚠️ Conecta Firebase para ver a otros alumnos.</p>";
        return;
    }

    list.innerHTML = "Cargando líderes mundiales...";

    // Esta función "escucha" la base de datos. Si alguien más gana, el ranking cambia solo.
    database.ref('global_ranking').orderByChild('blocks').limitToLast(10).on('value', (snapshot) => {
        let players = [];
        snapshot.forEach(child => { players.push(child.val()); });
        players.reverse(); // El que tiene más bloques arriba

        list.innerHTML = players.map((p, i) => `
            <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #334155; color:white;">
                <span>${i + 1}. ${p.name} ${p.name === currentUser.name ? '<b>(Tú)</b>' : ''}</span>
                <span style="color:#22c55e; font-weight:bold;">${p.blocks} blq</span>
            </div>
        `).join('');
    });
}

function closeRanking() {
    document.getElementById('ranking-modal').style.display = 'none';
}

// ==========================================
// NIVELES Y BLOQUES
// ==========================================
function cargarNiveles() {
    const nav = document.getElementById('levels');
    const niveles = ["-A1", "A1", "A2", "B1", "B2", "C1", "C2", "C3"];
    
    nav.innerHTML = niveles.map(lvl => `
        <div class="level-card" onclick="${lvl === '-A1' ? 'mostrarBloques()' : ''}" 
             style="padding:15px; margin:5px; background:#1e293b; color:white; border-radius:10px; text-align:center; cursor:pointer; ${lvl !== '-A1' ? 'opacity:0.3' : 'border:2px solid #3b82f6'}">
            ${lvl}
        </div>
    `).join('');
}

function mostrarBloques() {
    const area = document.getElementById('area-estudio');
    // Aquí asumo que tienes tu archivo lessonsA1Minus cargado
    const bloques = lessonsA1Minus[0].blocks;

    area.innerHTML = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; margin-top:20px;">
            <h2 style="color:white; text-align:center;">Módulos del Nivel</h2>
            ${bloques.map(b => {
                const hecho = currentUser.completedBlocks.includes(b.id);
                return `<button onclick="iniciarLeccion(${b.id})" style="width:100%; padding:15px; margin-top:10px; border:none; border-radius:10px; font-weight:bold; cursor:pointer; background:${hecho ? '#22c55e' : '#3b82f6'}; color:white;">
                    ${hecho ? '✅' : '📖'} ${b.title}
                </button>`;
            }).join('')}
        </div>
    `;
}