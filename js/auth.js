document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");
    const errorMsg = document.getElementById("error-msg");

    // LOG IN
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); 

            const user = document.getElementById("username").value;
            const pass = document.getElementById("password").value;

            // Kredensial sementara untuk Admin Vault
            if (user === "admin" && pass === "ketick2026") { 
                
                sessionStorage.setItem("ketickAuth", "true");
                loginForm.innerHTML = '<h3 style="color: var(--accent-blue); font-family: var(--font-heading);">ACCESS GRANTED.<br><span style="font-size:0.9rem; color:var(--text-muted);">Connecting to mainframe...</span></h3>';
                
                setTimeout(() => {
                    window.location.href = "admin-dashboard.html";
                }, 1500);

            } else {
                errorMsg.style.display = "block";
                const loginBox = document.querySelector('.login-box');
                loginBox.style.transform = "translateX(-10px)";
                setTimeout(() => loginBox.style.transform = "translateX(10px)", 100);
                setTimeout(() => loginBox.style.transform = "translateX(0)", 200);
            }
        });
    }

    // LOG OUT
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("ketickAuth");
            window.location.href = "login.html";
        });
    }
});
