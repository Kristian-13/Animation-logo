/* Kris · Midnight Remix — interakce
   1) otáčení plechovky (samo, rychleji při hoveru, tažením myší/prstem)
   2) parallax vrstev podle kurzoru
   3) „play mode“ – kliknutím se roztančí celá stránka
   4) scroll reveal sekcí */
(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    const hero = document.querySelector('.hero');
    const can = document.getElementById('can');
    const strip = document.getElementById('canStrip');
    const vinyl = document.getElementById('vinyl');
    const eq = document.getElementById('eq');
    const playBtn = document.getElementById('playBtn');

    /* ---------- ekvalizér ---------- */
    const bars = window.innerWidth < 768 ? 22 : 44;
    for (let i = 0; i < bars; i++) {
        const b = document.createElement('i');
        const wave = Math.sin(i / bars * Math.PI);           // vyšší uprostřed
        b.style.setProperty('--h', (0.25 + wave * 0.6 + Math.random() * 0.15).toFixed(2));
        b.style.setProperty('--d', (0.8 + Math.random() * 0.9).toFixed(2) + 's');
        b.style.setProperty('--delay', (-Math.random() * 2).toFixed(2) + 's');
        eq.appendChild(b);
    }

    /* ---------- plechovka: nekonečný potisk ---------- */
    const wrap = strip.querySelector('.can__wrap');
    const clone = wrap.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    strip.appendChild(clone);

    let offset = 0;            // posun potisku v px
    let speed = 0;             // aktuální rychlost (px/s)
    let hovering = false;
    let playing = false;
    let dragging = false;
    let dragX = 0, dragStartX = 0, dragVel = 0, lastMove = 0;
    let spin = 0;              // úhel vinylu

    const targetSpeed = () => {
        const w = wrap.offsetWidth;          // jedno otočení
        if (playing) return w / 1.6;
        if (hovering) return w / 3.5;
        return reduceMotion ? 0 : w / 14;
    };

    let last = performance.now();
    function tick(now) {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;

        if (!dragging) {
            speed += (targetSpeed() - speed) * Math.min(dt * 2.5, 1);
            offset += speed * dt;
        }
        const w = wrap.offsetWidth || 1;
        offset = ((offset % w) + w) % w;
        strip.style.transform = `translate3d(${-offset}px,0,0)`;

        // vinyl se točí podle toho, jak rychle se točí plechovka
        spin += (playing ? 260 : 24) * dt * (reduceMotion ? 0 : 1);
        vinyl.style.setProperty('--spin', (spin % 360).toFixed(2) + 'deg');

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    can.addEventListener('pointerenter', () => hovering = true);
    can.addEventListener('pointerleave', () => hovering = false);

    can.addEventListener('pointerdown', (e) => {
        dragging = true;
        dragX = dragStartX = e.clientX;
        dragVel = 0;
        lastMove = performance.now();
        can.setPointerCapture(e.pointerId);
    });

    can.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const now = performance.now();
        const dx = e.clientX - dragX;
        offset -= dx * 1.4;                       // táhni doprava = otáčej doprava
        dragVel = (-dx * 1.4) / Math.max((now - lastMove) / 1000, 0.008);
        dragX = e.clientX;
        lastMove = now;
    });

    const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        if (Math.abs(e.clientX - dragStartX) < 6) {
            togglePlay(e);                         // klik bez tažení
        } else {
            speed = Math.max(-4000, Math.min(4000, dragVel)); // setrvačnost
        }
    };
    can.addEventListener('pointerup', endDrag);
    can.addEventListener('pointercancel', () => dragging = false);

    /* ---------- play mode ---------- */
    function burst(x, y) {
        if (reduceMotion) return;
        const rect = hero.getBoundingClientRect();
        for (let i = 0; i < 9; i++) {
            const n = document.createElement('img');
            n.src = 'assets/img/note.svg';
            n.alt = '';
            n.className = 'burst';
            n.style.left = (x - rect.left - 17) + 'px';
            n.style.top = (y - rect.top - 17) + 'px';
            const a = Math.random() * Math.PI * 2;
            const dist = 120 + Math.random() * 180;
            n.style.setProperty('--tx', Math.cos(a) * dist + 'px');
            n.style.setProperty('--ty', Math.sin(a) * dist - 80 + 'px');
            n.style.setProperty('--tr', (Math.random() * 120 - 60) + 'deg');
            hero.appendChild(n);
            n.addEventListener('animationend', () => n.remove());
        }
    }

    function togglePlay(e) {
        playing = !playing;
        document.body.classList.toggle('is-playing', playing);
        playBtn.setAttribute('aria-pressed', String(playing));
        playBtn.querySelector('.play__text').textContent = playing ? 'Pauza' : 'Pusť to nahlas';
        if (playing) {
            const r = can.getBoundingClientRect();
            const x = e && e.clientX ? e.clientX : r.left + r.width / 2;
            const y = e && e.clientY ? e.clientY : r.top + r.height / 2;
            burst(x, y);
        }
    }
    playBtn.addEventListener('click', (e) => {
        const r = can.getBoundingClientRect();
        togglePlay({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 3 });
    });

    /* ---------- parallax ---------- */
    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        let raf = 0;
        window.addEventListener('pointermove', (e) => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                root.style.setProperty('--px', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
                root.style.setProperty('--py', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
                raf = 0;
            });
        });
    }

    /* ---------- scroll reveal ---------- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) {
                en.target.classList.add('is-visible');
                io.unobserve(en.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
