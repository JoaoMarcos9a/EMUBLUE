// --- ESTADO DO SISTEMA ---
const emulatorState = {
    isPoweredOn: true,
    installedApps: ['Settings', 'Browser'],
    currentScreen: 'home'
};

// --- ELEMENTOS DO DOM ---
const screenContent = document.getElementById('screen-content');
const apkInput = document.getElementById('apk-file-input');
const uploadStatus = document.getElementById('upload-status');
const progressBar = document.getElementById('progress-bar');
const modal = document.getElementById('install-modal');

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("EMUBLUE: Sistema Inicializado.");
    renderHome();
});

// --- FUNÇÕES DE CONTROLE ---

function togglePower() {
    emulatorState.isPoweredOn = !emulatorState.isPoweredOn;
    screenContent.style.opacity = emulatorState.isPoweredOn ? "1" : "0";
}

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    apkInput.value = ""; // Limpa o input
    uploadStatus.style.display = 'none';
    progressBar.style.width = '0%';
}

// --- LÓGICA DE INSTALAÇÃO (O CORAÇÃO) ---

async function startInstallation() {
    const file = apkInput.files[0];

    if (!file) {
        alert("Selecione um arquivo .apk primeiro!");
        return;
    }

    if (!file.name.toLowerCase().endsWith('.apk')) {
        alert("Erro: Selecione um arquivo com extensão .apk");
        return;
    }

    // Iniciar Simulação de Upload
    uploadStatus.style.display = 'block';
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            finalizarInstalacao(file.name);
        }
        
        progressBar.style.width = `${progress}%`;
    }, 250);
}

function finalizarInstalacao(nomeArquivo) {
    const nomeApp = nomeArquivo.replace('.apk', '').replace(/[-_]/g, ' ');
    
    // Adiciona ao sistema
    emulatorState.installedApps.push(nomeApp);
    
    alert(`Sucesso! ${nomeApp} instalado no ambiente virtual.`);
    
    closeModal();
    renderHome(); // Atualiza a tela inicial com o novo app
}

// --- RENDERIZAÇÃO DA INTERFACE ---

function renderHome() {
    if (!emulatorState.isPoweredOn) return;

    emulatorState.currentScreen = 'home';
    
    screenContent.innerHTML = `
        <div class="android-ui">
            <div class="status-bar">
                <span>12:45</span>
                <div class="icons">📶 🔋</div>
            </div>
            <div class="app-grid" id="app-grid"></div>
        </div>
    `;

    const grid = document.getElementById('app-grid');
    
    // Renderiza apps instalados
    emulatorState.installedApps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.className = 'app-icon';
        appDiv.onclick = () => launchApp(app);
        appDiv.innerHTML = `
            <div class="icon-img" style="background: linear-gradient(45deg, #3498db, #8e44ad);">🚀</div>
            <span>${app}</span>
        `;
        grid.appendChild(appDiv);
    });
}

function launchApp(appName) {
    if (!emulatorState.isPoweredOn) return;

    // Simula a tela de carregamento do App
    screenContent.innerHTML = `
        <div class="android-ui app-runtime">
            <div class="status-bar">
                <span>${appName}</span>
                <button class="btn-close-app" onclick="goHome()">X</button>
            </div>
            <div class="app-container-real">
                <div class="loading-screen">
                    <div class="spinner"></div>
                    <p>Iniciando ambiente...</p>
                </div>
            </div>
        </div>
    `;

    // Simula o tempo de boot do app
    setTimeout(() => {
        const container = document.querySelector('.app-container-real');
        container.innerHTML = `
            <div class="app-content">
                <div class="app-icon-large" style="font-size: 50px;">📱</div>
                <h2 style="margin-top:20px;">${appName}</h2>
                <p style="color: #888; font-size: 14px;">Ambiente Virtualizado Ativo</p>
                <button class="btn-action" onclick="alert('Interface de ${appName} em execução!')">Abrir App</button>
            </div>
        `;
    }, 2500);
}

function goHome() {
    renderHome();
}
