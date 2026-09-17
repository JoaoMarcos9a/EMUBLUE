// Simulação de Sistema
let isPoweredOn = true;

function togglePower() {
    const screen = document.getElementById('screen-content');
    isPoweredOn = !isPoweredOn;
    screen.style.opacity = isPoweredOn ? "1" : "0";
    screen.style.transition = "opacity 0.5s";
}

function launchApp(appName) {
    if(!isPoweredOn) return;
    
    const grid = document.getElementById('app-grid');
    const screen = document.getElementById('screen-content');
    
    // Simula abertura de app com efeito de overlay
    screen.innerHTML = `
        <div class="android-ui" style="background: #111; padding: 20px; text-align: center;">
            <div class="status-bar"><span>${appName}</span> <button onclick="location.reload()">Back</button></div>
            <h2 style="margin-top: 50px;">${appName}</h2>
            <p>Iniciando ambiente virtual...</p>
            <div class="loader"></div>
        </div>
    `;
}

// Simulação de Instalação de Apps
function installApp() {
    const name = document.getElementById('apk-name').value;
    const color = document.getElementById('apk-color').value;
    
    if(!name) return alert("Dê um nome ao app!");

    const grid = document.getElementById('app-grid');
    
    // Cria novo ícone de app
    const newApp = document.createElement('div');
    newApp.className = 'app-icon';
    newApp.onclick = () => launchApp(name);
    newApp.innerHTML = `
        <div class="icon-img" style="background: ${color}">🚀</div>
        <span>${name}</span>
    `;
    
    grid.appendChild(newApp);
    closeModal();
    
    // Feedback visual
    console.log(`[System] APK ${name} instalado com sucesso.`);
}

// Controle de Resolução (Simulando mudança de Hardware)
document.getElementById('device-model').addEventListener('change', (e) => {
    const body = document.getElementById('phone-body');
    const val = e.target.value;

    if(val === 'pixel-6') {
        body.style.width = '320px';
        body.style.height = '650px';
    } else if(val === 'galaxy-s21') {
        body.style.width = '300px';
        body.style.height = '620px';
    } else {
        body.style.width = '450px';
        body.style.height = '750px';
    }
});

// Funções do Modal
function openModal() { document.getElementById('install-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('install-modal').style.display = 'none'; }

// Iniciar com um pequeno delay de "boot"
window.onload = () => {
    console.log("DeepHat Emulator Engine Ready...");
};
