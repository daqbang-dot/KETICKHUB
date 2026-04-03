document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");
    const errorMsg = document.getElementById("error-msg");

    // === 1. PROSES LOG MASUK (login.html) ===
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Halang page reload

            const user = document.getElementById("username").value;
            const pass = document.getElementById("password").value;

            // MOCK API CHECK (Gantikan ini dengan kod API sebenar anda nanti)
            // Cth API: fetch('https://api.ketick.my/auth', { ... })
            if (user === "admin" && pass === "ketick2026") { // <-- ID & Password sementara
                
                // Simpan token/status dalam session
                sessionStorage.setItem("ketickAuth", "true");
                
                // Animasi sikit sebelum masuk
                loginForm.innerHTML = '<h3 style="color: var(--accent-blue);">ACCESS GRANTED.<br>Connecting to mainframe...</h3>';
                
                setTimeout(() => {
                    window.location.href = "admin-dashboard.html";
                }, 1500);

            } else {
                errorMsg.style.display = "block";
                
                // Goncang form sikit kalau salah (Visual cue)
                const loginBox = document.querySelector('.login-box');
                loginBox.style.transform = "translateX(-10px)";
                setTimeout(() => loginBox.style.transform = "translateX(10px)", 100);
                setTimeout(() => loginBox.style.transform = "translateX(0)", 200);
            }
        });
    }

    // === 2. PROSES LOG KELUAR (admin-dashboard.html) ===
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("ketickAuth");
            window.location.href = "login.html";
        });
    }
});
