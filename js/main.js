// ==========================================
// KETICK_OS - CORE LOGIC (main.js)
// ==========================================

function refreshStats() {
    if (typeof KETICK_DB !== 'undefined') {
        const ideaCount = KETICK_DB.count('ideas') + 7; 
        const bizCount = KETICK_DB.count('partners') + 12; 

        const ideaText = document.querySelector('#widget-ideanest span');
        const bizText = document.querySelector('#widget-business span');

        if (ideaText) ideaText.textContent = `${ideaCount} in Incubation`;
        if (bizText) bizText.textContent = `${bizCount} Active`;

        if (ideaChart) {
            ideaChart.data.datasets[0].data[5] = ideaCount;
            ideaChart.update();
        }
    }
}

function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    if (clockElement) clockElement.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock(); 

setInterval(() => {
    const cpuValElement = document.getElementById('cpu-val');
    if (cpuValElement) cpuValElement.textContent = (Math.floor(Math.random() * 20) + 5) + "%";
}, 3000);

let ideaChart; 
function initChart() {
    const ctx = document.getElementById('chartIdea');
    if (!ctx) return;

    let currentIdeas = 7;
    if (typeof KETICK_DB !== 'undefined') currentIdeas += KETICK_DB.count('ideas');

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Idea In Incubation',
            data: [2, 3, 5, 4, 6, currentIdeas],
            borderColor: '#fbbf24', 
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#0f172a',
            pointRadius: 4
        }]
    };

    const config = {
        type: 'line', data: data,
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: true, mode: 'index', intersect: false } },
            scales: {
                x: { grid: { color: 'rgba(51, 65, 85, 0.5)' }, ticks: { color: '#94a3b8', font: { family: "'Fira Code', monospace", size: 10 } } },
                y: { grid: { color: 'rgba(51, 65, 85, 0.5)' }, ticks: { color: '#94a3b8', stepSize: 2, font: { family: "'Fira Code', monospace", size: 10 } }, beginAtZero: true }
            }
        }
    };
    ideaChart = new Chart(ctx, config);
}
if (typeof Chart !== 'undefined') initChart();

// ==========================================
// EASTER EGG LOGIC: THE MATRIX
// ==========================================
let matrixInterval;
function startMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.classList.add('matrix-active');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    };
    matrixInterval = setInterval(draw, 33);
}

function stopMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    canvas.classList.remove('matrix-active');
    clearInterval(matrixInterval);
}

// ==========================================
// TERMINAL COMMAND PARSER
// ==========================================
const cliInput = document.getElementById('cli-input');
const terminalLog = document.getElementById('terminal-log');

function addToLog(msg, color = 'text-slate-300') {
    if (!terminalLog) return;
    const div = document.createElement('div');
    div.className = `mb-1 ${color}`;
    div.innerHTML = `<span class="text-slate-600">>></span> ${msg}`;
    terminalLog.appendChild(div);
    terminalLog.scrollTop = terminalLog.scrollHeight;
}

if (cliInput) {
    cliInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const fullCmd = this.value.trim();
            const cmd = fullCmd.toLowerCase();
            this.value = ''; 
            
            if (cmd === '') return;
            addToLog(fullCmd, 'text-amber-400');

            if (cmd === 'help') {
                addToLog('Commands: menu, status, system info, whoami, clear, logout', 'text-blue-400');
            } 
            else if (cmd === 'menu') {
                addToLog('--- SYSTEM DIRECTORY ---', 'text-amber-400');
                addToLog('Type command to navigate:', 'text-slate-400');
                addToLog('> goto biz     (Business Hub)', 'text-emerald-400');
                addToLog('> goto nest    (Idea Incubator)', 'text-emerald-400');
                addToLog('> goto vault   (Family Storage)', 'text-emerald-400');
                addToLog('> goto sandbox (Entertainment)', 'text-emerald-400');
            }
            else if (cmd === 'system info') {
                addToLog('--- KETICK_HUB_OS_INFO ---', 'text-blue-400');
                addToLog('VERSION: 1.0.4-STABLE', 'text-slate-400');
                addToLog('ENGINE: VANILLA_JS_CORE', 'text-slate-400');
                addToLog('ENCRYPTION: AES-256-GCM', 'text-slate-400');
                addToLog('STATUS: ALL_SYSTEMS_GO', 'text-emerald-500');
            }
            else if (cmd === 'clear') terminalLog.innerHTML = '<div class="text-slate-500 mb-2">// Logs cleared.</div>';
            else if (cmd === 'status') addToLog('OS: KETICK_V1 | RESPONSIVE: TRUE', 'text-emerald-500');
            else if (cmd === 'whoami') addToLog('USER_ID: ADMIN_01 | ROLE: SUPER_USER', 'text-purple-400');
            else if (cmd === 'logout') {
                addToLog('Terminating session...', 'text-red-400');
                if (typeof KETICK_DB !== 'undefined') setTimeout(() => KETICK_DB.logout(), 1000);
            }
            // ROUTING
            else if (cmd === 'goto nest') { setTimeout(() => window.location.href = 'ideanest.html', 500); }
            else if (cmd === 'goto biz') { setTimeout(() => window.location.href = 'business.html', 500); }
            else if (cmd === 'goto vault') { setTimeout(() => window.location.href = 'family.html', 500); }
            else if (cmd === 'goto sandbox') { setTimeout(() => window.location.href = 'entertainment.html', 500); }
            
            // EASTER EGGS
            else if (cmd === 'matrix') {
                addToLog('Wake up, Neo...', 'text-emerald-500 font-bold');
                startMatrix();
                setTimeout(() => addToLog('Type "exit matrix" to return to reality.', 'text-emerald-400 animate-pulse'), 2000);
            }
            else if (cmd === 'exit matrix') {
                addToLog('Returning to KETICK_OS...', 'text-slate-400');
                stopMatrix();
            }
            else if (cmd === 'ping') {
                addToLog('PONG. Latency: 1ms. Connection Excellent.', 'text-cyan-400');
            }
            else if (cmd === 'sudo rm -rf /') {
                addToLog('ACCESS DENIED: Critical System files protected. Nice try.', 'text-red-500 font-bold animate-bounce');
            }
            else if (cmd.startsWith('add idea')) {
                const match = fullCmd.match(/add idea ["']?(.*?)["']?$/i);
                if (match && match[1]) {
                    if (typeof KETICK_DB !== 'undefined') {
                        KETICK_DB.save('ideas', { name: match[1], desc: 'Added via CLI', fund: 'TBA' });
                        refreshStats();
                        addToLog(`[SUCCESS] Idea "${match[1]}" added.`, 'text-emerald-400');
                    }
                } else addToLog('Format: add idea "Nama Idea"', 'text-red-400');
            } 
            else {
                addToLog(`Unknown command. Type 'help' or 'menu'.`, 'text-red-400');
            }
        }
    });
}

document.querySelectorAll('#project-tree li').forEach(item => {
    item.addEventListener('click', function() {
        const folder = this.innerText.replace(/[├──|└──]/g, '').trim();
        addToLog(`Accessing directory: /${folder}`, 'text-blue-400');
        setTimeout(() => {
            if(folder === 'business/') window.location.href = 'business.html';
            if(folder === 'ideanest/') window.location.href = 'ideanest.html';
            if(folder === 'entertainment/') window.location.href = 'entertainment.html';
            if(folder === 'family/') window.location.href = 'family.html';
        }, 800);
    });
});

setTimeout(refreshStats, 500);
