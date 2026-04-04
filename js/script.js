document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INTERSECTION OBSERVER
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                if(entry.target.classList.contains('widget')) {
                    const chart = entry.target.querySelector('.chart-container');
                    const circle = entry.target.querySelector('.circular-progress');
                    if(chart) chart.classList.add('animate');
                    if(circle) circle.classList.add('animate');
                }

                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; 
                    const increment = target / (duration / 16); 
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toLocaleString();
                        }
                    };
                    updateCounter();
                    counter.classList.remove('counter'); 
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-down').forEach(el => observer.observe(el));

    // 2. MAGNETIC BUTTON
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0px, 0px)');
    });

    // 3. CANVAS PARTICLES
    const canvas = document.getElementById('particle-canvas');
    if(!canvas) return; 
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let w, h;

    function resizeCanvas() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            const colors = ['rgba(112, 161, 255, 0.3)', 'rgba(165, 94, 234, 0.3)', 'rgba(255, 255, 255, 0.2)'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x > w || this.x < 0) this.speedX *= -1;
            if (this.y > h || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color; ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (w * h) / 20000;
        for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update(); particlesArray[i].draw();
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 80) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(112, 161, 255, ${0.05 - distance/1600})`;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke(); ctx.closePath();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    initParticles(); animateParticles();
});
