// Background Canvas Bintang Berkedip
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.8,
            alpha: Math.random(),
            speed: Math.random() * 0.01 + 0.003
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) {
            star.speed = -star.speed;
        }
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});

resizeCanvas();
initStars();
drawStars();

// Kontrol Audio (Sempurna)
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
bgMusic.volume = 0.6;

function playMusic() {
    bgMusic.play().then(() => {
        musicBtn.innerText = "🎵 Sempurna (Playing)";
    }).catch(err => {
        console.log("Autoplay dicegah browser, tunggu interaksi user:", err);
    });
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = "🎵 Sempurna (Playing)";
    } else {
        bgMusic.pause();
        musicBtn.innerText = "🔇 Music Paused";
    }
}

// Mulai perjalanan dari Wave 1 ke Wave 2 sekaligus memutar lagu
function startJourney() {
    playMusic();
    nextWave(2);
}

// Navigasi Interaktif Wave
function nextWave(waveNumber) {
    document.querySelectorAll('.wave').forEach(w => {
        w.classList.remove('active');
    });

    const targetWave = document.getElementById(`wave${waveNumber}`);
    targetWave.classList.add('active');

    if (waveNumber === 2) {
        startTypingEffect();
    }
}

// Efek Ketik Teks pada Wave 2
const textToType = "under the starry night, like the bluest sky in the morning, or the darkest cloud in storm... thank you for existing. through thick and thin, happy and sad, even its never been easy for you you still manage to make me feel safe in your arms";
let typeIndex = 0;
let typingTimer = null;

function startTypingEffect() {
    const element = document.getElementById('typed-text');
    element.innerHTML = "";
    typeIndex = 0;
    clearTimeout(typingTimer);

    function type() {
        if (typeIndex < textToType.length) {
            element.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            typingTimer = setTimeout(type, 45);
        }
    }
    type();
}

// Fitur Tiup Lilin pada Wave 3
let candleBlown = false;

function blowCandle() {
    if (candleBlown) return;
    
    const flame = document.getElementById('flame');
    const status = document.getElementById('wish-status');
    const btnNext = document.getElementById('btn-wave3');

    flame.classList.add('off');
    status.innerText = "yay! your wish has been sent to the stars... 🌌✨";
    status.style.color = "#38bdf8";
    btnNext.classList.remove('hidden');
    candleBlown = true;
}

// Reset kembali ke Wave 1
function restart() {
    candleBlown = false;
    document.getElementById('flame').classList.remove('off');
    document.getElementById('wish-status').innerText = "press the small flame to extinguish it (while blowing it so it feels kinda real hehe)";
    document.getElementById('wish-status').style.color = "#94a3b8";
    document.getElementById('btn-wave3').classList.add('hidden');
    nextWave(1);
}