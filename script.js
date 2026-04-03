// 1. Interactive Background Particles (Community Connections)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
        // Warm color palette for particles
        const colors = ['rgba(251, 146, 60, 0.5)', 'rgba(34, 211, 238, 0.5)', 'rgba(74, 222, 128, 0.5)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bouncing off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction (push away gently)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            this.x -= forceDirectionX * 2;
            this.y -= forceDirectionY * 2;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect nearby particles with lines
        for (let j = i; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y - particlesArray[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color.replace('0.5', '0.1'); // Fainter lines
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// 2. Family & Entertainment Live Feed (FOMO Generator)
const feedContainer = document.getElementById('liveFeedContainer');
const dummyFeeds = [
    "👨‍👩‍👧 Keluarga Ahmad baru daftar masuk!",
    "🎥 Poll Komuniti: Kartun 90an vs Sekarang?",
    "💡 Resipi 'Air Tangan Ibu' viral di ruang komuniti.",
    "🎟️ 15 orang sedang rancang aktiviti riadah hujung minggu.",
    "🕹️ Pertandingan e-sukan keluarga bermula dalam 1 jam!",
    "💬 Perbincangan hangat: Tips cuti sekolah bajet."
];

function addFeedItem() {
    const randomText = dummyFeeds[Math.floor(Math.random() * dummyFeeds.length)];
    const feedElement = document.createElement('div');
    feedElement.className = 'bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-sm text-slate-200 opacity-0 transform translate-y-4';
    feedElement.innerHTML = randomText;
    
    feedContainer.prepend(feedElement); // Add to top

    // GSAP Animation to slide in
    gsap.to(feedElement, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });

    // Keep only top 4 items to prevent overflow
    if (feedContainer.children.length > 4) {
        const lastChild = feedContainer.lastElementChild;
        gsap.to(lastChild, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => feedContainer.removeChild(lastChild) 
        });
    }
}
// Push new feed every 3.5 seconds
setInterval(addFeedItem, 3500);
addFeedItem(); // Add one immediately


// 3. Fresh Idea Radar Data
const radarText = document.getElementById('radarText');
const radarIdeas = ["DIY Kraf", "Movie Night", "Resipi Baru", "Dekorasi", "Tips Jimat"];

setInterval(() => {
    // Fade out
    gsap.to(radarText, { opacity: 0, duration: 0.5, onComplete: () => {
        // Change text
        radarText.innerText = radarIdeas[Math.floor(Math.random() * radarIdeas.length)];
        // Fade in
        gsap.to(radarText, { opacity: 1, duration: 0.5, scale: 1.2, yoyo: true, repeat: 1 });
    }});
}, 4000);


// 4. "Gamified" Magnetic Button
const magBtn = document.getElementById('magneticBtn');

magBtn.addEventListener('mousemove', (e) => {
    const rect = magBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic pull using GSAP
    gsap.to(magBtn, {
        x: x * 0.3, // Strength of the pull
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
    });
});

magBtn.addEventListener('mouseleave', () => {
    // Snap back to center
    gsap.to(magBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
});

magBtn.addEventListener('click', () => {
    // Tindakan sebenar bawa user ke page platform
    window.location.href = 'https://ketick.my';
});


// 5. Easter Egg Interaction (Click Radar)
const radarWidget = document.getElementById('radarWidget');
const modal = document.getElementById('easterEggModal');
const modalContent = document.getElementById('easterEggContent');
const closeModal = document.getElementById('closeModalBtn');

radarWidget.addEventListener('click', () => {
    modal.classList.remove('pointer-events-none');
    gsap.to(modal, { opacity: 1, duration: 0.3 });
    gsap.to(modalContent, { scale: 1, duration: 0.4, ease: "back.out(1.7)" });
});

closeModal.addEventListener('click', () => {
    gsap.to(modalContent, { scale: 0.95, duration: 0.3 });
    gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => {
        modal.classList.add('pointer-events-none');
    }});
});

// Initial Load Animation (Staggered UI entry)
gsap.from(".glass", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.5
});
