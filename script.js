const apkInput = document.getElementById('apk-file-input');
const uploadStatus = document.getElementById('upload-status');
const progressText = document.getElementById('progress');
const btnInstall = document.getElementById('btn-install-real');

// Função para iniciar a instalação real
async function startInstallation() {
    const file = apkInput.target ? apkInput.target.files[0] : apkInput.files[0];

    if (!file) {
        alert("Por favor, selecione um arquivo .apk primeiro!");
        return;
    }

    if (!file.name.endsWith('.apk')) {
        alert("O arquivo selecionado não é um APK válido!");
        return;
    }

    // 1. Simular Processo de Upload e Parsing de Arquivo
    btnInstall.disabled = true;
    uploadStatus.style.display = 'block';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15);
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            finalizeInstallation(file.name);
        }
        progressText.innerText = `${progress}%`;
    }, 300);
}

// 2. Simular a "Instalação" no Sistema Virtual
function finalizeInstallation(fileName) {
    const appName = fileName.replace('.apk', '').replace(/[-_]/g, ' ');
    
    // Adiciona o app ao estado do sistema
    emulatorState.installedApps.push(appName);
    
    // Feedback Visual de Sucesso
    alert(`Sucesso! O aplicativo "${appName}" foi instalado no ambiente virtual.`);
    
    // Fecha o modal e limpa
    closeModal();
    btnInstall.disabled = false;
    uploadStatus.style.display = 'none';
    progressText.innerText = '0%';
    
    // Atualiza a interface do emulador
    renderHome(); 
}

// 3. Função de Execução do App (Onde a mágica acontece)
function launchApp(appName) {
    if (!emulatorState.isPoweredOn) return;

    // Aqui simulamos o carregamento do ambiente de execução
    // Em um sistema real, isso chamaria um servidor WebRTC ou um WebAssembly Container
    screenContent.innerHTML = `
        <div class="android-ui app-runtime">
            <div class="status-bar">
                <span>${appName}</span>
                <button onclick="goHome()" class="btn-close-app">X</button>
            </div>
            <div class="app-container-real">
                <div class="app-loading-screen">
                    <div class="spinner"></div>
                    <p>Iniciando Máquina Virtual...</p>
                    <p style="font-size: 10px; color: #555;">Configurando Sandbox de Segurança...</p>
                </div>
            </div>
        </div>
    `;

    // Simula o tempo de "boot" do app
    setTimeout(() => {
        const appContainer = document.querySelector('.app-container-real');
        appContainer.innerHTML = `
            <div class="app-content-real">
                <div class="app-header"></div>
                <div class="app-body">
                    <img src="https://via.placeholder.com/150/3498db/ffffff?text=${appName}" style="border-radius: 20px; margin-bottom: 20px;">
                    <h3>${appName}</h3>
                    <p>Ambiente de execução virtualizado pronto.</p>
                    <button class="btn-action" onclick="alert('Interface de app simulada!')">Abrir Interface</button>
                </div>
            </div>
        `;
    }, 3000);
}

function goHome() {
    renderHome();
}
