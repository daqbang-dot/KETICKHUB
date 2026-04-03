// ==========================================
// KETICK HUB - AUTHENTICATION LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const logs = document.getElementById('auth-logs');
    const accessId = document.getElementById('access-id');
    const securityKey = document.getElementById('security-key');

    function addLog(msg, color = 'text-slate-500') {
        const div = document.createElement('div');
        div.className = color;
        div.textContent = `[${new Date().toLocaleTimeString('en-GB', {hour12:false})}] ${msg}`;
        logs.appendChild(div);
        logs.scrollTop = logs.scrollHeight;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulasi Kredensial (Boleh tukar ikut suka tuan)
        const VALID_ID = "admin";
        const VALID_KEY = "ketick2026";

        addLog(`Attempting handshake: ${accessId.value}`, 'text-amber-400');

        setTimeout(() => {
            if (accessId.value === VALID_ID && securityKey.value === VALID_KEY) {
                addLog('Key matched. Authenticating with KETICK_API...', 'text-emerald-500');
                
                setTimeout(() => {
                    addLog('SUCCESS: Token generated. Redirecting...', 'text-emerald-400');
                    
                    // Simpan session dalam LocalStorage (Simulasi Token API)
                    localStorage.setItem('ketick_session', 'AUTH_ACTIVE_' + Date.now());
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }, 1500);
            } else {
                addLog('ERROR: Access Denied. Credentials mismatch.', 'text-red-500');
                securityKey.value = '';
                // Efek gegar jika gagal
                loginForm.classList.add('animate-bounce');
                setTimeout(() => loginForm.classList.remove('animate-bounce'), 500);
            }
        }, 1000);
    });
});
