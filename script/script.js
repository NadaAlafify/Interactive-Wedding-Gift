const weddingDate = new Date("April 30, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const diff = weddingDate - now;
    const el = document.getElementById('countdown-display');
    if (!el) return;

    if (diff <= 0) {
        el.innerHTML = `<p class="celebration-msg">يوم الفرح قد حلّ 💍</p>`;
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    el.innerHTML = `
        <div class="count-unit">
            <span class="count-num">${d}</span>
            <span class="count-lbl">يوم</span>
        </div>
        <span class="count-sep">:</span>
        <div class="count-unit">
            <span class="count-num">${String(h).padStart(2,'0')}</span>
            <span class="count-lbl">ساعة</span>
        </div>
        <span class="count-sep">:</span>
        <div class="count-unit">
            <span class="count-num">${String(m).padStart(2,'0')}</span>
            <span class="count-lbl">دقيقة</span>
        </div>
    `;
}

updateCountdown();
setInterval(updateCountdown, 30000);

function startExperience() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('hidden');

    document.getElementById('audio').play().catch(() => {});

    setTimeout(() => {
        overlay.style.display = 'none';

        const wrapper = document.getElementById('card-wrapper');
        wrapper.style.display = 'flex';

        const card = document.getElementById('card');
        card.style.display = 'block';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => card.classList.add('visible'));
        });

        const sequence = [
            ['el-divider', 200],
            ['el-verse',   500],
            ['el-names',   950],
            ['el-date',    1350],
            ['el-dua',     1750],
            ['el-bottom',  2100],
        ];

        sequence.forEach(([id, delay]) => {
            setTimeout(() => {
                const el = document.getElementById(id);
                el.classList.add('fade-up');
            }, delay);
        });

        setTimeout(() => startParticles(), 1200);
    }, 1000);
}

const EMOJIS = ['🌸', '✨', '💗', '🤍', '🎀', '🌷', '⭐'];

function spawnParticle() {
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-20px';
    el.style.fontSize = (Math.random() * 10 + 13) + 'px';
    const dur = Math.random() * 4 + 5;
    el.style.animationDuration = dur + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}

function startParticles() {
    for (let i = 0; i < 12; i++) {
        setTimeout(spawnParticle, i * 80);
    }
    setInterval(spawnParticle, 700);
}