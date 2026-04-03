// ==========================================
// KETICK HUB - ADVANCED MISSION CONTROL LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DUAL CLOCK SYSTEM ---
    function updateClocks() {
        const now = new Date();
        
        // Local Time (AM/PM)
        const local = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        document.getElementById('clock').textContent = local;

        // UTC Time (24h)
        const utc = now.toISOString().substr(11, 8);
        document.getElementById('utc-clock').textContent = utc;
    }
    setInterval(updateClocks, 1000);

    // --- 2. IDEANEST LINE CHART (Smooth Curve) ---
    const ctxIdea = document.getElementById('chartIdea').getContext('2d');
    const ideaGradient = ctxIdea.createLinearGradient(0, 0, 0, 150);
    ideaGradient.addColorStop(0, 'rgba(251, 191, 36, 0.2)');
    ideaGradient.addColorStop(1, 'transparent');

    const chartIdea = new Chart(ctxIdea, {
        type: 'line',
        data: {
            labels: ['01', '02', '03', '04', '05', '06', '07'],
            datasets: [{
                data: [10, 15, 12, 18, 14, 20, 18],
                borderColor: '#fbbf24',
                backgroundColor: ideaGradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                hoverPointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });

    // --- 3. BIZ PERFORMANCE BAR CHART ---
    const ctxBiz = document.getElementById('chartBiz').getContext('2d');
    const chartBiz = new Chart(ctxBiz, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                data: [40, 65, 50, 85, 70],
                backgroundColor: '#3b82f6',
                borderRadius: 4,
                barThickness: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { grid: { color: '#1e293b' }, ticks: { display: false } }
            }
        }
    });

    // --- 4. SYSTEM HEALTH SIMULATION ---
    setInterval(() => {
        const load = Math.floor(Math.random() * 15) + 5;
        document.getElementById('cpu-load').textContent = load + "%";
    }, 2000);

    // --- 5. TERMINAL CLI ---
    const cliInput = document.getElementById('cli-input');
    const terminalLog = document.getElementById('terminal-log');

    function addToLog(msg, color = "text-slate-400") {
        const div = document.createElement('div');
        div.className = `mb-1 ${color}`;
        div.innerHTML = `<span class="text-slate-700">>></span> ${msg}`;
        terminalLog.appendChild(div);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    cliInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = cliInput.value.trim().toLowerCase();
            cliInput.value = '';
            
            addToLog(cmd, "text-amber-400");

            if (cmd === 'help') addToLog("Available commands: deploy, status, clear, menu, logout", "text-blue-400");
            else if (cmd.startsWith('deploy')) addToLog("Initializing deployment sequence... Success.", "text-emerald-500");
            else if (cmd === 'clear') terminalLog.innerHTML = "";
            else if (cmd === 'logout') KETICK_DB.logout();
            else addToLog("ERR: Command not found. Use 'help'", "text-red-500");
        }
    });

});
