document.addEventListener('DOMContentLoaded', () => {

    // 1. CLOCK
    function updateClock() {
        const clock = document.getElementById('clock');
        if (clock) {
            clock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. CHART CONFIGURATION (Architect Style)
    const ctx = document.getElementById('mainChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['APR_01', 'APR_02', 'APR_03', 'APR_04', 'APR_05', 'APR_06'],
                datasets: [{
                    data: [18, 25, 21, 35, 28, 45],
                    borderColor: '#38BDF8',
                    borderWidth: 2,
                    pointBackgroundColor: '#0A0C10',
                    pointBorderColor: '#38BDF8',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    tension: 0.3,
                    fill: true,
                    backgroundColor: 'rgba(56, 189, 248, 0.03)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: '#1E232D' }, ticks: { color: '#64748B', font: { size: 9 } } },
                    y: { grid: { color: '#1E232D' }, ticks: { color: '#64748B', font: { size: 9 } } }
                }
            }
        });
    }

    // 3. TERMINAL CLI
    const cliInput = document.getElementById('cli-input');
    const terminalLog = document.getElementById('terminal-log');

    function addToLog(msg, type = 'default') {
        const div = document.createElement('div');
        div.className = type === 'success' ? 'text-emerald-500' : 'text-slate-500';
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        terminalLog.appendChild(div);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    if (cliInput) {
        cliInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = cliInput.value.trim().toLowerCase();
                cliInput.value = '';
                addToLog(`CMD_EXEC: ${cmd}`);

                if (cmd === 'status') addToLog('SYSTEM_STABLE: 100%', 'success');
                else if (cmd === 'goto biz') window.location.href = 'business.html';
                else if (cmd === 'goto nest') window.location.href = 'ideanest.html';
                else if (cmd === 'clear') terminalLog.innerHTML = '';
                else if (cmd === 'help') addToLog('Commands: status, clear, goto [biz/nest], logout');
                else addToLog(`Error: Command '${cmd}' unrecognized.`);
            }
        });
    }

    // 4. SYSTEM METRICS SIMULATION
    setInterval(() => {
        const load = Math.floor(Math.random() * 8) + 4;
        const cpuText = document.getElementById('cpu-load');
        const cpuBar = document.getElementById('cpu-bar');
        if (cpuText) cpuText.textContent = load + "%";
        if (cpuBar) cpuBar.style.width = load + "%";
    }, 3000);
});
