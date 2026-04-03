// ==========================================
// KETICK HUB - FAMILY VAULT LOGIC (Persistent)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const vForm = document.getElementById('vault-form');
    const vList = document.getElementById('vault-list');
    const vLog = document.getElementById('vault-log');

    // Fungsi Log Terminal
    function logMsg(msg, color) {
        vLog.innerHTML = `<div class="${color}">>> ${msg}</div>`;
        
        if(color.includes('emerald')) {
            setTimeout(() => {
                vLog.innerHTML = `<div class="text-slate-500">// Vault locked. Awaiting input.</div>`;
            }, 5000);
        }
    }

    // Fungsi Render Fail Vault
    function renderVaultItem(data, isNew = false) {
        const newItem = document.createElement('div');
        newItem.className = `bg-[#1E293B] border border-slate-700/50 rounded-lg p-4 flex items-center justify-between hover:border-cyan-400/50 transition-all ${isNew ? 'glow-cyan' : ''}`;
        
        const iconSign = isNew ? '[+]' : '[-]';
        
        newItem.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="text-cyan-400 text-2xl font-mono">${iconSign}</div>
                <div>
                    <h3 class="font-mono text-cyan-400 text-sm">${data.name}</h3>
                    <p class="text-[10px] font-mono text-slate-500">Hash: ${data.hash} | Access: ${data.level}</p>
                </div>
            </div>
            <button class="text-xs font-mono text-slate-400 hover:text-emerald-400 bg-[#0F172A] border border-slate-600 px-3 py-1 rounded">> DECRYPT</button>
        `;
        vList.prepend(newItem);
    }

    // Load data dari core.js (Database Simulator)
    if (typeof KETICK_DB !== 'undefined') {
        const savedVault = KETICK_DB.get('vault');
        savedVault.forEach(file => renderVaultItem(file));
    } else {
        console.error("KETICK_DB tidak dijumpai. Pastikan core.js dipanggil sebelum family.js");
    }

    // Logik Borang Penyulitan (Encryption)
    vForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('v-name').value.trim();
        const level = document.getElementById('v-level').value;
        const hash = Math.random().toString(36).substring(2, 8).toUpperCase() + '...' + Math.random().toString(36).substring(2, 6).toUpperCase();

        logMsg('Generating RSA-2048 Keys...', 'text-cyan-400 animate-pulse');

        setTimeout(() => {
            const newFile = { 
                name: name, 
                level: level, 
                hash: hash 
            };
            
            // Simpan ke DB
            if (typeof KETICK_DB !== 'undefined') {
                KETICK_DB.save('vault', newFile);
            }
            
            // Paparkan di UI
            renderVaultItem(newFile, true);
            logMsg(`SUCCESS: File encrypted and stored in Vault.`, 'text-emerald-400');
            
            // Reset Form
            vForm.reset();
        }, 1500);
    });
});
