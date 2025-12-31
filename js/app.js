// ==========================================
// 1. CONFIGURACIÓN DE FIREBASE
// ==========================================
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
let database;
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    database = firebase.database();
} catch (e) {
    console.warn("Firebase no conectado. Ranking en modo local.");
}

// ==========================================
// 2. VARIABLES GLOBALES
// ==========================================
let currentUser = JSON.parse(localStorage.getItem('englishUser')) || null;
let aciertosGlobal = 0;

window.onload = () => {
    actualizarInterfaz();
    dibujarNiveles();
};

// ==========================================
// 3. GESTIÓN DE USUARIO
// ==========================================
function createUser() {
    const name = document.getElementById('username-input').value.trim();
    if (!name) return alert("Escribe un nombre");
    currentUser = { name: name, completedBlocks: [] };
    guardarProgreso();
    actualizarInterfaz();
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

function actualizarInterfaz() {
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
    
    const total = 40;
    const completados = currentUser.completedBlocks.length;
    const porc = Math.round((completados / total) * 100);
    document.getElementById('main-progress-bar').style.width = porc + "%";
    document.getElementById('main-progress-bar').innerText = porc + "%";
    document.getElementById('progress-text').innerText = `Bloques completados: ${completados} / ${total}`;
}

// ==========================================
// 4. MAPA Y LECCIONES
// ==========================================
function dibujarNiveles() {
    const nav = document.getElementById('levels');
    const lvls = ["-A1", "A1", "A2", "B1", "B2", "C1", "C2", "C3"];
    nav.innerHTML = lvls.map(l => `
        <div class="card" onclick="${l==='-A1'?'mostrarBloques()':''}" style="padding:15px; margin:5px; background:#1e293b; color:white; border-radius:10px; ${l==='-A1'?'border:2px solid #3b82f6; cursor:pointer;':'opacity:0.4;'}">
            ${l}
        </div>
    `).join('');
}

function mostrarBloques() {
    const bloques = lessonsA1Minus[0].blocks;
    document.getElementById('area-estudio').innerHTML = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; margin-top:20px; color:white;">
            <h3>Módulos de Nivel -A1</h3>
            ${bloques.map(b => {
                const hecho = currentUser.completedBlocks.includes(b.id);
                return `<button onclick="estudiar(${b.id})" style="width:100%; padding:12px; margin-top:8px; border-radius:8px; border:none; background:${hecho?'#22c55e':'#3b82f6'}; color:white; font-weight:bold; cursor:pointer;">
                    ${hecho ? '✅' : '📖'} ${b.title}
                </button>`;
            }).join('')}
            <div id="pantalla-examen" style="margin-top:20px;"></div>
        </div>
    `;
}

function estudiar(id) {
    const bloque = lessonsA1Minus[0].blocks.find(b => b.id === id);
    aciertosGlobal = 0;
    let html = `<div style="background:#0f172a; padding:15px; border-radius:10px; border:1px solid #22c55e;">
        <h4>Examen: ${bloque.title}</h4>`;
    bloque.examen.forEach(p => {
        html += `<div style="margin-bottom:15px; background:#334155; padding:10px; border-radius:8px;">
            <p>${p.q}</p>
            ${p.o.map(o => `<button onclick="validar(this, '${o}', '${p.r}', ${id})" style="margin:5px; padding:8px; background:#1e293b; color:white; border:1px solid #3b82f6; border-radius:5px; cursor:pointer;">${o}</button>`).join('')}
        </div>`;
    });
    html += `</div>`;
    document.getElementById('pantalla-examen').innerHTML = html;
}

function validar(btn, elegida, correcta, id) {
    if (elegida === correcta) {
        btn.style.background = "#22c55e";
        btn.disabled = true;
        aciertosGlobal++;
        if (aciertosGlobal === 10) {
            if (!currentUser.completedBlocks.includes(id)) currentUser.completedBlocks.push(id);
            guardarProgreso();
            actualizarInterfaz();
            alert("🎯 ¡Perfecto! Bloque completado.");
            mostrarBloques();
        }
    } else {
        alert("❌ Error. Inténtalo de nuevo.");
        estudiar(id);
    }
}

// ==========================================
// 5. RANKING GLOBAL
// ==========================================
function showRanking() {
    document.getElementById('ranking-modal').style.display = 'block';
    const list = document.getElementById('ranking-list');
    if (!database) return list.innerHTML = "Modo Local activo.";

    database.ref('ranking').orderByChild('score').limitToLast(10).on('value', snap => {
        let p = [];
        snap.forEach(c => p.push(c.val()));
        p.reverse();
        list.innerHTML = p.map((u, i) => `
            <div style="display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid #334155;">
                <span>${i+1}. ${u.username}</span>
                <span style="color:#22c55e; font-weight:bold;">${u.score} blq</span>
            </div>
        `).join('');
    });
}

function closeRanking() { document.getElementById('ranking-modal').style.display = 'none'; }