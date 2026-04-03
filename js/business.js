// ==========================================
// KETICK HUB - BUSINESS HUB LOGIC (Updated with DB)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    const bizForm = document.getElementById('business-form');
    const bizGrid = document.getElementById('business-grid');
    const bizLog = document.getElementById('biz-log');

    // 1. FUNGSI LOG TERMINAL
    function logMessage(msg, type = 'info') {
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        let colorClass = 'text-slate-400';
        
        if (type === 'success') colorClass = 'text-emerald-400';
        if (type === 'error') colorClass = 'text-red-400';
        if (type === 'process') colorClass = 'text-blue-400';

        bizLog.innerHTML = `<div class="${colorClass} animate-pulse">>[${time}] ${msg}</div>`;
        
        if(type === 'success') {
            setTimeout(() => {
                bizLog.innerHTML = `<div class="text-slate-500">// Ready for next payload...</div>`;
            }, 5000);
        }
    }

    // 2. FUNGSI RENDER KAD PERNIAGAAN
    function renderPartner(data, isNew = false) {
        const newCard = document.createElement('div');
        newCard.className = 'bg-[#1E293B] border border-blue-400/50 rounded-lg p-5 shadow-[0_0_15px_rgba(96,165,250,0.1)] transition-all group';
        
        const badgeClass = isNew ? 'animate-pulse' : '';
        const badgeText = isNew ? 'NEW_ENTITY' : 'VERIFIED';

        newCard.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="font-mono text-blue-400 font-semibold text-lg">${data.name}</h3>
                    <p class="text-[10px] font-mono text-slate-500">SSM: ${data.ssm} | ${data.type}</p>
                </div>
                <span class="text-[10px] font-mono text-slate-400 border border-slate-600 px-1 rounded ${badgeClass}">${badgeText}</span>
            </div>
            <div class="bg-[#0F172A] rounded p-2 text-xs font-mono text-slate-400 border border-slate-700 mb-3">
                > Services: ${data.services}<br>
                > Ping: ${Math.floor(Math.random() * 20) + 1}ms (Active)
            </div>
            <div class="flex justify-between text-xs font-mono">
                <button class="text-blue-400 hover:text-blue-300 group-hover:underline">> Establish_Link</button>
                <span class="text-slate-500 hover:text-emerald-400 cursor-pointer">[ View_QR ]</span>
            </div>
        `;

        bizGrid.prepend(newCard);
    }

    // 3. LOAD DATA DARI DATABASE SEMASA MULA
    if (typeof KETICK_DB !== 'undefined') {
        const savedPartners = KETICK_DB.get('partners');
        // Render data dari DB (jika ada)
        savedPartners.forEach(partner => renderPartner(partner, false));
    } else {
        console.error("KETICK_DB tidak dijumpai. Pastikan core.js dipanggil sebelum business.js");
    }

    // 4. LOGIK PENDAFTARAN & SIMPAN KE DB
    bizForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('biz-name').value.trim();
        const ssm = document.getElementById('biz-ssm').value.trim() || 'PENDING_VERIFICATION';
        const services = document.getElementById('biz-services').value.trim();
        const type = document.getElementById('biz-type').value;

        if (!name || !services) {
            logMessage('ERR: ENTITY_NAME dan CORE_SERVICES mandatori.', 'error');
            return;
        }

        logMessage('Verifying credentials... Mengesahkan pendaftaran SSM...', 'process');

        setTimeout(() => {
            logMessage('Generating Digital Twin ID & QR Codes...', 'process');
            
            setTimeout(() => {
                const newPartnerData = {
                    name: name,
                    ssm: ssm,
                    services: services,
                    type: type
                };

                // Simpan ke DB
                if (typeof KETICK_DB !== 'undefined') {
                    KETICK_DB.save('partners', newPartnerData);
                }

                // Paparkan di UI
                renderPartner(newPartnerData, true);

                logMessage(`SUCCESS: Entiti "${name}" berjaya didaftarkan ke Rangkaian Niaga.`, 'success');
                bizForm.reset();

            }, 1000);
        }, 1000);
    });
});
