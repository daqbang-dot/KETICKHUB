const KETICK_DB = {
    save(key, data) {
        const existing = this.get(key);
        existing.push(data);
        localStorage.setItem(`ketick_${key}`, JSON.stringify(existing));
    },
    get(key) {
        const data = localStorage.getItem(`ketick_${key}`);
        return data ? JSON.parse(data) : [];
    },
    count(key) {
        return this.get(key).length;
    },
    logout() {
        localStorage.removeItem('ketick_session');
        window.location.href = 'login.html';
    }
};

// Security Check
(function() {
    if (!localStorage.getItem('ketick_session') && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
})();
