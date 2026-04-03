// ==========================================
// KETICK HUB - CENTRAL CORE ENGINE (core.js)
// ==========================================

const KETICK_DB = {
    // Fungsi Simpan Data
    save(key, data) {
        const existing = this.get(key);
        existing.push(data);
        localStorage.setItem(`ketick_${key}`, JSON.stringify(existing));
    },

    // Fungsi Ambil Data
    get(key) {
        const data = localStorage.getItem(`ketick_${key}`);
        return data ? JSON.parse(data) : [];
    },

    // Fungsi Kira Jumlah
    count(key) {
        return this.get(key).length;
    },

    // Sistem Keselamatan Terpusat
    checkAuth() {
        const session = localStorage.getItem('ketick_session');
        if (!session && !window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
    },

    logout() {
        localStorage.removeItem('ketick_session');
        window.location.href = 'login.html';
    }
};

// Jalankan pemeriksaan keselamatan setiap kali script di-load
KETICK_DB.checkAuth();
