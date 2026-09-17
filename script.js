// --- ESTADO DO EMULADOR (O "Cérebro") ---
const emulatorState = {
    isPoweredOn: true,
    installedApps: ['Settings', 'Browser'],
    currentScreen: 'home', // home, app, settings
    deviceModel: 'pixel-6'
};

// --- SELETORES DE ELEMENTOS (DOM) ---
const screenContent = document.getElementById('screen-content');
const appGrid = document.getElementById('app-grid');
const modal = document.getElementById('install-modal');

// --- FUNÇÕES DE NAVEGAÇÃO ---

// 1. Função para o Botão Power
function togglePower() {
    emulatorState.isPoweredOn = !emulatorState.isPoweredOn;
    screenContent.style.opacity = emulatorState.isPoweredOn ? "1" : "0";
    console.log(`Sistema: ${emulatorState.isPoweredOn ? 'Ligado' : 'Desligado'}`);
}

// 2. Função para simular a abertura de um App
function launchApp(appName) {
    if (!emulatorState.isPoweredOn) return;

    // Simula uma transição de tela
    screenContent.innerHTML = `
        <div class="android-ui app-view">
            <div class="status-bar">
                <span>${appName}</span>
                <button onclick="goHome()" style="background:none; color:white; border:1px solid white; border-radius:5px;">Voltar</button>
            </div>
            <div class="app-body">
                <h2>${appName}</h2>
                <p>Simulando ambiente de execução...</p>
                <div class="loading-bar"></div>
            </div>
        </div>
    `;
}

// 3. Função para voltar para a Home
function goHome() {
    renderHome();
}

// 4. Função para renderizar a tela inicial (Home)
function renderHome() {
    if (!emulatorState.isPoweredOn) return;

    emulatorState.currentScreen = 'home';
    
    // Limpa a tela e reconstrói o grid de apps
    screenContent.innerHTML = `
        <div class="android-ui">
            <div class="status-bar">
                <span>12:00</span>
                <div class="icons">📶 🔋</div>
            </div>
            <div class="app-grid" id="app-grid">
                <!-- Apps serão renderizados aqui -->
            </div>
        </div>
    `;

    // Renderiza os apps instalados
    const grid = document.getElementById('app-grid');
    emulatorState.installedApps.forEach(app => {
        const appIcon = document.createElement('div');
        appIcon.className = 'app-icon';
        appIcon.innerHTML = `
            <div class="icon-img" style="background: linear-gradient(45deg, #3498db, #8e44ad);">🚀</div>
            <span>${app}</span>
        `;
        appIcon.onclick = () => launchApp(app);
        grid.appendChild(appIcon);
    });
}

// 5. Função para Instalar Novo APK (Simulação)
function installApp() {
    const appNameInput = document.getElementById('apk-name');
    const appName = appNameInput.value;

    if (appName) {
        emulatorState.installedApps.push(appName);
        console.log(`[Sistema] Instalando ${appName}...`);
        
        // Fecha o modal e atualiza a tela
        closeModal();
        renderHome();
    } else {
        alert("Digite o nome do aplicativo!");
    }
}

// --- CONTROLE DO MODAL ---
function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("EMUBLUE: Motor de emulação iniciado.");
    renderHome(); // Começa na tela home
});
