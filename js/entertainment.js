// ==========================================
// KETICK HUB - ENTERTAINMENT LOGIC (Persistent)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const entForm = document.getElementById('ent-form');
    const entGrid = document.getElementById('ent-grid');
    const entLog = document.getElementById('ent-log');

    // Fungsi Log Terminal
    function logMsg(msg, color) {
        entLog.innerHTML = `<div class="${color} animate-pulse">>> ${msg}</div>`;
        
        // Reset log selepas beberapa saat jika ia adalah mesej kejayaan
        if(color.includes('emerald')) {
            setTimeout(() => {
                entLog.innerHTML = `<div class="text-slate-500">// Standby for transmission...</div>`;
            }, 5000);
        }
    }

    // Fungsi Render Kandungan Hiburan
    function renderContent(data, isNew = false) {
        const div = document.createElement('div');
        div.className = `bg-[#1E293B] border border-slate-700/50 rounded-lg p-5 shadow-lg hover:border-fuchsia-400/30 transition-all group ${isNew ? 'glow-fuchsia' : ''}`;
        
        const badgeClass = isNew ? 'animate-pulse' : '';
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-mono text-fuchsia-400 font-semibold">${data.title}</h3>
                <span class="text-[10px] font-mono text-amber-400 border border-amber-400/30 px-1 rounded ${badgeClass}">${data.type}</span>
            </div>
            <p class="text-sm text-slate-400 mb-4 line-clamp-2">Transmission received. Content is live on the network.</p>
            <div class="flex justify-between text-xs font-mono mt-auto">
                <span class="text-slate-500">Views: ${Math.floor(Math.random() * 100)}</span>
                <button class="text-fuchsia-400 hover:text-fuchsia-300 group-hover:underline">> Access_File</button>
            </div>
        `;
        entGrid.prepend(div);
    }

    // Load data dari core.js (Database Simulator) semasa page di-load
    if (typeof KETICK_DB !== 'undefined') {
        const savedEntertainment = KETICK_DB.get('entertainment');
        savedEntertainment.forEach(item => renderContent(item));
    } else {
        console.error("KETICK_DB tidak dijumpai. Pastikan core.js dipanggil sebelum entertainment.js");
    }

    // Logik Borang Pendaftaran Content
    entForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newData = {
            title: document.getElementById('ent-title').value.trim(),
            type: document.getElementById('ent-type').value
        };

        logMsg('Compiling media assets...', 'text-fuchsia-400');

        setTimeout(() => {
            // Simpan ke DB
            if (typeof KETICK_DB !== 'undefined') {
                KETICK_DB.save('entertainment', newData);
            }
            
            // Paparkan di UI
            renderContent(newData, true);
            logMsg(`SUCCESS: Broadcast [${newData.title}] is LIVE.`, 'text-emerald-400');
            
            // Reset form
            entForm.reset();
        }, 1200);
    });
});
